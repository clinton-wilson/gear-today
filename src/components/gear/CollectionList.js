import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import "./inventory.css"

export const CollectionList = () => {
    const { userId, inventoryId } = useParams()
    const [userInventory, setUserInventory] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?_embed=inventorys&id=${userId}`)
                .then(res => res.json())
                .then((userInventoryData) => {
                    setUserInventory(userInventoryData)
                })
        },
        [userId]
    )
    return <>
        <article className="collectionDetails">
            {
                userInventory.map((inventory) => {
                    return <section>
                        <h2>{inventory.collectionName}</h2>
                        <header>A collection of {inventory.fullName}'s gear</header>
                        <footer>{inventory.collectionDescription}</footer>
                        {
                            inventory.inventorys.map((inventory) => {
                                return <section className="userInventoryItem">
                                    <img src={inventory.photo} alt={inventory.description}></img>
                                    <footer><Link to={`/inventorys/${inventoryId}`}>{inventory.manufacturer} {inventory.name}</Link></footer>
                                </section>
                            })
                        }


                    </section>
                })
            }
        </article>
    </>
}