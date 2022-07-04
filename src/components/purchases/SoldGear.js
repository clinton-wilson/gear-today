import { useEffect, useState } from "react"

export const SoldGear = () => {
    const [purchases, setPurchases] = useState([])
    const [users, setUsers] = useState([])
    const localGearUser = localStorage.getItem("gear_user")
    const gearUserObject = JSON.parse(localGearUser)

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

    return <>
        <h3 className="titleRequest">Sold Gear</h3>
        <article className="purchasesContainer">
            {
                purchases.map((purchase) => {
                    const userMatch = users.find(({ id }) => id === purchase.buyerId)
                    if (gearUserObject.id === purchase.sellerId && purchase.requestStatus === "accepted") {
                        return <section className="purchase">
                            <div className="purchasePics">
                                <img className="inventoryPic" src={purchase?.inventorys?.photo} alt={purchase?.inventorys?.description}>
                                </img>
                            </div>
                            <footer className="purchaseHeader">You sold your {purchase?.inventorys?.manufacturer} {purchase?.inventorys?.name} to {`${userMatch?.fullName}`} on {purchase?.dateResponded}</footer>
                        </section>
                    }

                })
            }
        </article>
    </>
}