import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Requests } from "../requests/ReceivedBorrowRequests"

export const GearDetails = () => {
    const { inventoryId } = useParams({ id: true })
    const [inventories, setInventories] = useState([])
    const [feedback, setFeedback] = useState("")

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

    }

    const sendBorrowRequest = (event, inventory) => {
        event.preventDefault()

        const requestObjectToAPI = {
            userId: gearUserObject.id,
            gearTypeId: inventory.gearTypeId,
            inventorysId: parseInt(inventoryId),
            requestStatus: "pending",
            dateBorrowed: "",
            dateReturned: ""
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

    }

    return <section className="gearDetails">
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        {
            inventories.map((inventory) => {
                if (inventory.id === parseInt(inventoryId)) {
                    if(inventory.lentOut){
                    return <article className="details">
                        <h2>{inventory.manufacturer} {inventory.name}</h2>
                        <img className="photoDetails" src={inventory.photo} alt={inventory.description}></img>
                        <header>{inventory.description}</header>
                        <footer>This item is currently unavailable</footer>
                        <button onClick={() => {
                            navigate(`/userCollections/${inventory.userId}
                        `)
                    }} className="backButton">Back to Collection</button>
                    </article>}
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