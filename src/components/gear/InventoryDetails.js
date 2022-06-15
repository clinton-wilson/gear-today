import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const InventoryDetails = () => {
    const { inventoryId } = useParams({ id: true })
    const [inventories, setInventories] = useState([])
    const navigate = useNavigate()
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
    return <section className="gearDetails">
        {
            inventories.map((inventory) => {
                if (inventory.id === parseInt(inventoryId)) {
                    return <article className="details">
                        <h2>{inventory.manufacturer} {inventory.name}</h2>
                        <img className="photoDetails" src={inventory.photo} alt={inventory.description}></img>
                        <header>{inventory.description}</header>
                        <button onClick={() => { navigate(`/inventory`) }} className="backButton">Back to Collection</button>
                    </article>
                }
            })
        }
    </section>
}