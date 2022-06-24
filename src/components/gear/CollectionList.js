import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import "./userCollections.css"

export const CollectionList = () => {
    const { userId, inventoryId } = useParams()
    const [userInventory, setUserInventory] = useState([])
    const navigate = useNavigate()
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
        <article>
            {
                userInventory.map((inventory) => {
                    return <section>
                        <div className="collectionTitle">
                            <h2 className="title">{inventory.collectionName}</h2>
                            <header>{inventory.fullName}'s gear</header>
                            <header>{inventory.collectionDescription}</header>
                        </div>
                        {
                            inventory.inventorys.map((inventory) => {
                                return <Link to={`/gearDetails/${inventory.id}`}>
                                    <section className="collections">
                                        <div className="collection">
                                            <img className="inventoryPic" src={inventory.photo} alt={inventory.description}></img>
                                            <footer>{inventory.manufacturer} {inventory.name}</footer>
                                        </div>
                                    </section></Link>

                            })
                        }
                    </section>
                })
            }
        </article>
        <button onClick={() => { navigate("/userCollections") }} className="backButton">Back to Collections</button>
    </>
}