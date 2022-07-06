import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Requests } from "../requests/ReceivedBorrowRequests"

export const GearDetails = () => {
    const { inventoryId } = useParams({ id: true })
    const [inventories, setInventories] = useState([])
    const [requests, setRequests] = useState([])
    const [feedback, setFeedback] = useState("")
    const [purchases, setPurchases] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/purchases?_expand=inventorys`)
                .then(res => res.json())
                .then((data) => {
                    setPurchases(data)
                })
        },
        []
    )

    useEffect(() => {
        if (feedback !== "") {
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])
    const navigate = useNavigate()
    const localGearUser = localStorage.getItem("gear_user")
    const gearUserObject = JSON.parse(localGearUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/inventorys`)
                .then(res => res.json())
                .then((inventoryData) => {
                    setInventories(inventoryData)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/borrowRequests?_expand=inventorys`)
                .then(res => res.json())
                .then((requestData) => {
                    setRequests(requestData)
                })
        },
        []
    )


    const sendPurchaseRequest = (event, inventory) => {
        event.preventDefault()

        const requestObjectToAPI = {
            buyerId: gearUserObject.id,
            sellerId: inventory.userId,
            inventorysId: inventory.id,
            datePurchased: "",
            requestStatus: "pending"
        }
        return fetch(`http://localhost:8088/purchases`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestObjectToAPI)
        })
            .then(res => res.json())
            .then(() => {
                setFeedback("Your request has been submitted!")
            })

            .then(() => {
                fetch(`http://localhost:8088/inventorys`)
                    .then(res => res.json())
                    .then((requestData) => {
                        setInventories(requestData)
                    })
                    .then(() => {
                        fetch(`http://localhost:8088/inventorys?_expand=user`)
                            .then(res => res.json())
                            .then((inventoryData) => {
                                setRequests(inventoryData)
                            })

                    })
            })

    }

    const sendBorrowRequest = (event, inventory) => {
        event.preventDefault()

        const requestObjectToAPI = {
            userId: gearUserObject.id,
            gearTypeId: inventory.gearTypeId,
            inventorysId: parseInt(inventoryId),
            requestStatus: "pending",
            dateBorrowed: "",
            dateResponded: ""
        }
        return fetch(`http://localhost:8088/borrowRequests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestObjectToAPI)
        })
            .then(res => res.json())
            .then(() => {
                setFeedback("Your request has been submitted!")
            })
            .then(() => {
                fetch(`http://localhost:8088/inventorys`)
                    .then(res => res.json())
                    .then((requestData) => {
                        setInventories(requestData)
                    })
                    .then(() => {
                        fetch(`http://localhost:8088/borrowRequests?_expand=inventorys`)
                            .then(res => res.json())
                            .then((inventoryData) => {
                                setRequests(inventoryData)
                            })
                    })
            })

    }

    const reversedInventories = inventories.map(inventory => inventory).reverse()

    return <section className="gearDetails">
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        {
            reversedInventories.map((inventory) => {
                const purchaseMatch = purchases.filter(({ inventorysId }) => inventorysId === inventory.id)
                const requestMatch = requests?.find(({ inventorysId }) => inventorysId === inventory?.id)
                console.log(purchaseMatch)
                if (inventory.id === parseInt(inventoryId)) {
                    if (inventory.lentOut) {
                        return <article className="details">
                            <h2>{inventory.manufacturer} {inventory.name}</h2>
                            <img className="photoDetails" src={inventory.photo} alt={inventory.description}></img>
                            <header>{inventory.description}</header>
                            <footer>This item is currently unavailable</footer>
                            <button onClick={() => {
                                navigate(`/userCollections/${inventory.userId}
                        `)
                            }} className="backButton">Back to Collection</button>
                        </article>
                    }
                    if (inventory.id === requestMatch?.inventorysId && requestMatch?.requestStatus === "pending") {
                        return <article className="details">
                            <h2>{inventory.manufacturer} {inventory.name}</h2>
                            <img className="photoDetails" src={inventory.photo} alt={inventory.description}></img>
                            <header>{inventory.description}</header>
                            <footer>This item is currently unavailable</footer>
                            <button onClick={() => {
                                navigate(`/userCollections/${inventory.userId}
                        `)
                            }} className="backButton">Back to Collection</button>
                        </article>
                    }
                    // if (inventory.id === parseInt(inventoryId) && inventory.lentOut === false && gearUserObject.id !== inventory.userId && purchaseMatch?.inventorysId === inventory.id && purchaseMatch?.requestStatus === "pending") {
                    //     return <article className="details">
                    //         <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                    //             {feedback}
                    //         </div>
                    //         <h2 className="gearName" >{inventory.manufacturer} {inventory.name}</h2>
                    //         <img className="photoDetails" src={inventory.photo} alt={inventory.description}></img>
                    //         <header className="description">{inventory.description}</header>
                    //         <footer className="status">This item belongs to {inventory?.user?.fullName} and is currently unavailable.</footer>
                    //     </article>
                    // }
                    else {
                        return <article className="details">
                            <h2>{inventory.manufacturer} {inventory.name}</h2>
                            <img className="photoDetails" src={inventory.photo} alt={inventory.description}></img>
                            <header>{inventory.description}</header>
                            <footer>Request</footer>
                            <button onClick={(clickEvent) => sendBorrowRequest(clickEvent, inventory)} >Borrow</button>
                            <button onClick={(clickEvent) => sendPurchaseRequest(clickEvent, inventory)} >Buy</button>
                            <button onClick={() => {
                                navigate(`/userCollections/${inventory.userId}
                        `)
                            }} className="backButton">Back to Collection</button>
                        </article>
                    }
                }
            })
        }
    </section>
}