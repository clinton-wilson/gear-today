import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import "./inventory.css"
export const Inventory = () => {
    const [inventories, setInventories] = useState([])
    const localGearUser = localStorage.getItem("gear_user")
    const gearUserObject = JSON.parse(localGearUser)

    const navigate = useNavigate()
    useEffect(
        () => {
            fetch(`http://localhost:8088/inventorys?userId=${gearUserObject.id}`)
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
                            <header className="inventory__header"><Link to={`/inventoryDetails/${inventory.id}`}>{inventory.manufacturer} {inventory.name}</Link></header>
                        </section>
                    }

                })
            }
        </article>
        <button className="myButton" onClick={() => navigate("/inventory/inventoryForm")}>Add Inventory Item</button>
    </>
}