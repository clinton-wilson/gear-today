import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const InventoryDetails = () => {
    const { inventoryId } = useParams()
    const [inventories, setInventories] = useState([])
    const [requestInventories, setRequestInventories] = useState([])
    const navigate = useNavigate()


    const returnedItem = (event, item) => {
        event.preventDefault()

        const returnedRequestToAPI = {
            userId: item.userId,
            gearTypeId: item.gearTypeId,
            inventorysId: item.inventorysId,
            requestStatus: "returned",
            dateBorrowed: item.dateBorrowed,
            dateReturned: new Date().toLocaleDateString()
        }



        fetch(`http://localhost:8088/borrowRequests/${item.id}`, {
            method: "PUT",
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
            })
            .then(() => {
                fetch(`http://localhost:8088/borrowRequests?_expand=inventorys&_expand=user`)
                    .then(res => res.json())
                    .then((requestData) => {
                        setRequestInventories(requestData)
                    })
                    .then(() => {
                        fetch(`http://localhost:8088/inventorys`)
                            .then(res => res.json())
                            .then((inventoryData) => {
                                setInventories(inventoryData)
                            })
                    })
            })
    }

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
            fetch(`http://localhost:8088/borrowRequests?_expand=inventorys&_expand=user`)
                .then(res => res.json())
                .then((requestData) => {
                    setRequestInventories(requestData)
                })
        },
        []
    )
    return <section className="gearDetails">
        {
            inventories.map((inventory) => {
                if (inventory.id === parseInt(inventoryId) && inventory.lentOut === false) {
                    return <article className="details">
                        <h2>{inventory.manufacturer} {inventory.name}</h2>
                        <img className="photoDetails" src={inventory.photo} alt={inventory.description}></img>
                        <header>{inventory.description}</header>
                        <footer>You have this item</footer>
                    </article>
                }
                if (inventory.lentOut === false) {
                    return <article>
                    </article>

                }
            })
        }
        {
            requestInventories.map((request) => {
                if (request.inventorysId === parseInt(inventoryId) && request?.inventorys?.lentOut) {
                    return <article className="details">
                        <h2>{request.inventorys.manufacturer} {request.inventorys.name}</h2>
                        <img className="photoDetails" src={request.inventorys.photo} alt={request.inventorys.description}></img>
                        <header>{request.inventorys.description}</header>
                        <footer>This item is being borrowed by {request?.user?.fullName}</footer>
                        <button onClick={(clickEvent) => { returnedItem(clickEvent, request) }} >Item returned</button>
                    </article>
                }

            })
        }

        <button onClick={() => { navigate(`/editGearForm/${inventoryId}`) }} className="backButton">Edit Item</button>

        <button onClick={() => { navigate(`/inventory`) }} className="backButton">Back to Collection</button>
    </section>
}