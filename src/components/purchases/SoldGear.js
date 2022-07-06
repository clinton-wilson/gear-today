import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const SoldGear = () => {
    const [purchases, setPurchases] = useState([])
    const [users, setUsers] = useState([])
    const localGearUser = localStorage.getItem("gear_user")
    const gearUserObject = JSON.parse(localGearUser)
    const [inventories, setInventories] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/purchases?_expand=inventorys`)
                .then(res => res.json())
                .then((purchaseData) => {
                    setPurchases(purchaseData)
                })
        },
        []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/users`)
                .then(res => res.json())
                .then((userData) => {
                    setUsers(userData)
                })
        },
        []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/inventorys`)
                .then(res => res.json())
                .then((userData) => {
                    setInventories(userData)
                })
        },
        []
    )

    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

    const newList = shuffle(inventories)

    const requestArray = []

    return <>
        <div className="mainTitleRequest">
            <h2>Sold Gear</h2>
        </div>
        <article className="borrowRequestsContainer">
            {
                purchases.map((purchase) => {
                    const userMatch = users.find(({ id }) => id === purchase.buyerId)
                    if (gearUserObject.id === purchase.sellerId && purchase.requestStatus === "accepted") {
                        { requestArray.push(purchase) }
                        return <section className="purchase">
                            <div className="purchasePics">
                                <img className="inventoryPic" src={purchase?.inventorys?.photo} alt={purchase?.inventorys?.description}>
                                </img>
                            </div>
                            <footer className="purchaseHeader">You sold your {purchase?.inventorys?.manufacturer} {purchase?.inventorys?.name} to {`${userMatch?.fullName}`} on {purchase?.dateResponded}</footer>
                        </section>
                    }

                }).reverse()
            }
            {requestArray.length === 0 ? (<section className="suggestions"><h3>You haven't sold any gear...</h3>
                <h3>Check out these selections you might like</h3>

                <article className="userCollections">

                    {
                        newList.slice(0, 3).map((inventory) => {
                            if (inventory.userId !== gearUserObject.id)
                                return <><Link to={`/inventoryDetails/${inventory.id}`}><section className="inventory">
                                    <img className="inventoryPic" src={inventory.photo} alt={inventory.description}></img>
                                    <header className="inventory__header">{inventory.manufacturer} {inventory.name}</header>
                                </section></Link></>
                        })
                    }
                </article>
            </section>) : ""}
        </article>
    </>
}