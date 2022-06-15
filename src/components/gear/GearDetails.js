import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

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
    const sendRequest = (event) => {
        event.preventDefault()

        const requestObjectToAPI = {
            userId: gearUserObject.id,
            inventoryId: parseInt(inventoryId),
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
                    return <article className="details">
                        <h2>{inventory.manufacturer} {inventory.name}</h2>
                        <img className="photoDetails" src={inventory.photo} alt={inventory.description}></img>
                        <header>{inventory.description}</header>
                        <footer>Request</footer>
                        <button onClick={(clickEvent) => sendRequest(clickEvent)} >Borrow</button>
                        <button>Buy</button>
                        <button onClick={() => { navigate(`/userCollections/${inventory.userId}`) }} className="backButton">Back to Collection</button>
                    </article>
                }
            })
        }
    </section>
}