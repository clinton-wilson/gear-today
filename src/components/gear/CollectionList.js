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
                    return <>
                        <div className="collectionTitle">
                            <h2 className="title">{inventory.collectionName}</h2>
                            <header className="gearHeader">{inventory.fullName}'s gear</header>
                            <header className="gearHeader">{inventory.collectionDescription}</header>
                        </div>
                        <section className="collectionLists">
                            {
                                inventory.inventorys.map((inventory) => {
                                    return <section className="collections"><Link to={`/gearDetails/${inventory.id}`}>

                                        <div className="collection">
                                            <img className="inventoryPic" src={inventory.photo} alt={inventory.description}></img>
                                            <footer>{inventory.manufacturer} {inventory.name}</footer>
                                        </div>
                                    </Link></section>

                                })
                            }
                        </section></>
                })
            }
        </article>
        <button onClick={() => { navigate(`/profile/${userId}`) }} className="backButton">View Profile</button>
        <button onClick={() => { navigate("/userCollections") }} className="backButton">Back to Collections</button>
    </>
}