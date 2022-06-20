import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import "./inventory.css"
export const Inventory = ({ searchTermState }) => {
    const [inventories, setInventories] = useState([])
    const [foundGear, setFoundGear] = useState([])
    const [inventoryGearType, setInventoryGearType] = useState([])
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

    useEffect(
        () => {
            fetch(`http://localhost:8088/inventorys?_expand=gearType`)
                .then(res => res.json())
                .then((inventoryData) => {
                    setInventoryGearType(inventoryData)
                })
        },
        []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/inventorys?userId=${gearUserObject.id}`)
                .then(res => res.json())
                .then((inventoryData) => {
                    setFoundGear(inventoryData)
                })
        },
        [inventories]
    )

    useEffect(
        () => {
            const searchedGear = inventoryGearType.filter(inventory => {
                return inventory.name.toLowerCase().startsWith(searchTermState.toLowerCase()) || inventory.manufacturer.toLowerCase().startsWith(searchTermState.toLowerCase()) || inventory.gearType.gearType.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFoundGear(searchedGear)
        },
        [searchTermState]
    )

    
    return <>
        <h2>Your Inventory</h2>
        
        <article className="inventories">
            {
                foundGear.map((inventory) => {
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