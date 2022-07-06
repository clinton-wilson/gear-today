import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./inventory.css"
export const InventoryDetails = () => {
    const { inventoryId } = useParams()
    const [inventories, setInventories] = useState([])
    const [requestInventories, setRequestInventories] = useState([])
    const navigate = useNavigate()
    const localGearUser = localStorage.getItem("gear_user")
    const gearUserObject = JSON.parse(localGearUser)
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

    useEffect(
        () => {
            fetch(`http://localhost:8088/inventorys?_expand=user`)
                .then(res => res.json())
                .then((inventoryData) => {
                    setInventories(inventoryData)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/borrowRequests?_expand=inventorys&_expand=user`)
                .then(res => res.json())
                .then((requestData) => {
                    setRequestInventories(requestData)
                })
        },
        []
    )

    const returnedItem = (event, item) => {
        event.preventDefault()

        const returnedRequestToAPI = {
            userId: item.userId,
            gearTypeId: item.gearTypeId,
            inventorysId: item.inventorysId,
            requestStatus: "returned",
            requestId: item.id,
            dateBorrowed: item.dateBorrowed,
            dateReturned: new Date().toLocaleDateString()
        }



        fetch(`http://localhost:8088/returnedGear`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(returnedRequestToAPI)
        })
            .then(res => res.json())
            .then(() => {
                const returnedItemToAPI = {
                    userId: item.inventorys.userId,
                    gearTypeId: item.inventorys.gearTypeId,
                    name: item.inventorys.name,
                    manufacturer: item.inventorys.manufacturer,
                    description: item.inventorys.description,
                    photo: item.inventorys.photo,
                    lentOut: false
                }
                return fetch(`http://localhost:8088/inventorys/${item?.inventorys?.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(returnedItemToAPI)
                })
                    .then(res => res.json())
                    .then(() => {
                        fetch(`http://localhost:8088/borrowRequests/${item.id}`, {
                            method: "DELETE"
                        })
                    })
            })
            .then(() => {
                fetch(`http://localhost:8088/borrowRequests?_expand=inventorys&_expand=user`)
                    .then(res => res.json())
                    .then((requestData) => {
                        setRequestInventories(requestData)
                    })
                    .then(() => {
                        fetch(`http://localhost:8088/inventorys?_expand=user`)
                            .then(res => res.json())
                            .then((inventoryData) => {
                                setInventories(inventoryData)
                            })
                    })
            })
    }


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
                fetch(`http://localhost:8088/purchases?_expand=inventorys`)
                    .then(res => res.json())
                    .then((requestData) => {
                        setPurchases(requestData)
                    })
                    .then(() => {
                        fetch(`http://localhost:8088/inventorys?_expand=user`)
                            .then(res => res.json())
                            .then((inventoryData) => {
                                setInventories(inventoryData)
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
                fetch(`http://localhost:8088/borrowRequests?_expand=inventorys&_expand=user`)
                    .then(res => res.json())
                    .then((requestData) => {
                        setRequestInventories(requestData)
                    })
                    .then(() => {
                        fetch(`http://localhost:8088/inventorys?_expand=user`)
                            .then(res => res.json())
                            .then((inventoryData) => {
                                setInventories(inventoryData)
                            })
                    })
            })

    }
    return <section className="gearDetails">
        {
            inventories.map((inventory) => {
                const purchaseMatch = purchases.filter(({ inventorysId }) => inventorysId === inventory.id)
                console.log(purchaseMatch)
                const requestMatch = requestInventories.find(({ inventorysId }) => inventorysId === inventory.id)
                if (inventory.id === parseInt(inventoryId) && inventory.lentOut === false && gearUserObject.id === inventory.userId) {
                    return <article className="details">

                        <h2 className="gearName" >{inventory.manufacturer} {inventory.name}</h2>
                        <img className="photoDetails" src={inventory.photo} alt={inventory.description}></img>
                        <header className="description">{inventory.description}</header>
                        <footer className="status">You have this item</footer>
                        <button onClick={() => { navigate(`/editGearForm/${inventoryId}`) }} className="inventoryDetailsButton">Edit Item</button>
                    </article>
                }
                if (inventory.id === parseInt(inventoryId) && inventory.lentOut === false && gearUserObject.id !== inventory.userId && requestMatch?.requestStatus === "pending") {
                    return <article className="details">
                        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                            {feedback}
                        </div>
                        <h2 className="gearName" >{inventory.manufacturer} {inventory.name}</h2>
                        <img className="photoDetails" src={inventory.photo} alt={inventory.description}></img>
                        <header className="description">{inventory.description}</header>
                        <footer className="status">This item belongs to {inventory?.user?.fullName} and is currently unavailable.</footer>
                    </article>
                }
                if (inventory.id === parseInt(inventoryId) && inventory.lentOut === false && gearUserObject.id !== inventory.userId && purchaseMatch?.inventorysId === inventory.id && purchaseMatch?.requestStatus === "pending") {
                    return <article className="details">
                        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                            {feedback}
                        </div>
                        <h2 className="gearName" >{inventory.manufacturer} {inventory.name}</h2>
                        <img className="photoDetails" src={inventory.photo} alt={inventory.description}></img>
                        <header className="description">{inventory.description}</header>
                        <footer className="status">This item belongs to {inventory?.user?.fullName} and is currently unavailable.</footer>
                    </article>
                }
                if (inventory.id === parseInt(inventoryId) && inventory.lentOut === false && gearUserObject.id !== inventory.userId) {
                    return <article className="details">
                        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                            {feedback}
                        </div>
                        <h2 className="gearName" >{inventory.manufacturer} {inventory.name}</h2>
                        <img className="photoDetails" src={inventory.photo} alt={inventory.description}></img>
                        <header className="description">{inventory.description}</header>
                        <footer className="status">This item belongs to {inventory?.user?.fullName}</footer>
                        <button onClick={(clickEvent) => sendBorrowRequest(clickEvent, inventory)} >Borrow</button>
                        <button onClick={(clickEvent) => sendPurchaseRequest(clickEvent, inventory)} >Buy</button>
                    </article>
                }

            })
        }
        {
            requestInventories.map((request) => {
                if (request.inventorysId === parseInt(inventoryId) && request?.inventorys?.lentOut && gearUserObject.id === request?.inventorys?.userId) {
                    return <article className="details">
                        <h2 className="gearName">{request.inventorys.manufacturer} {request.inventorys.name}</h2>
                        <img className="photoDetails" src={request.inventorys.photo} alt={request.inventorys.description}></img>
                        <header className="description">{request.inventorys.description}</header>
                        <footer className="status">This item is being borrowed by {request?.user?.fullName}</footer>
                        <button onClick={(clickEvent) => { returnedItem(clickEvent, request) }} >Item returned</button>
                        <button onClick={() => { navigate(`/editGearForm/${inventoryId}`) }} className="inventoryDetailsButton">Edit Item</button>
                    </article>
                }
                if (request.inventorysId === parseInt(inventoryId) && request?.inventorys?.lentOut && gearUserObject.id !== request?.inventorys?.userId) {
                    return <article className="details">
                        <h2 className="gearName">{request.inventorys.manufacturer} {request.inventorys.name}</h2>
                        <img className="photoDetails" src={request.inventorys.photo} alt={request.inventorys.description}></img>
                        <header className="description">{request.inventorys.description}</header>
                        <footer className="status">This item is being borrowed by {request?.user?.fullName}</footer>

                    </article>
                }

            })

        }


        <button onClick={() => { navigate(`/inventory`) }} className="inventoryDetailsButton">Back to Collection</button>
    </section>
}