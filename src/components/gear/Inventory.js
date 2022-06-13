import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Inventory = () => {
    const [inventories, setInventories] = useState([])
    const localGearUser = localStorage.getItem("gear_user")
    const gearUserObject = JSON.parse(localGearUser)
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

    return <>
        <h2>Your Inventory</h2>
        <article className="inventories">
            {
                inventories.map((inventory) => {
                    if (gearUserObject.id === inventory.userId) {
                        return <section className="inventory">
                            <img src={inventory.photo} alt={inventory.description}></img>
                            <header className="inventory__header">Name: {inventory.manufacturer} {inventory.name}</header>
                        </section>
                    }
                })
            }
        </article>
        <button className="myButton" onClick={() => navigate("/inventory/inventoryForm")}>Add Inventory Item</button>
    </>
}