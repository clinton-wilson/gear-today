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
        {
            purchases.map((purchase) => {
                const userMatch = users.find(({ id }) => id === purchase.buyerId )
                if (gearUserObject.id === purchase.sellerId && purchase.requestStatus === "accepted") {
                    return <>
                    <footer>You sold your {purchase?.inventorys?.manufacturer} {purchase?.inventorys?.name} to {`${userMatch?.fullName}`} on {purchase?.datePurchased}</footer>
                    </>
                }
            
            })
        }
    </>
}