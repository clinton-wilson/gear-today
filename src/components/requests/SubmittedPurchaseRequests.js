import { useEffect, useState } from "react"

export const SubmittedPurchaseRequests = () => {
    const [purchaseRequests, setPurchaseRequests] = useState([])
    const [users, setUsers] = useState([])
    const localGearUser = localStorage.getItem("gear_user")
    const gearUserObject = JSON.parse(localGearUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/purchases?_expand=inventorys`)
                .then(res => res.json())
                .then((purchaseData) => {
                    setPurchaseRequests(purchaseData)
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

    return <article className="purchaseRequest">
        {
            purchaseRequests.map((request) => {
                const userMatch = users.find(({ id }) => id === request.sellerId)
                if (gearUserObject.id === request.buyerId && request.requestStatus === "accepted")
                    return <header className="acceptedRequest">{`${userMatch?.fullName}`} accepted your request to buy their {request?.inventorys?.manufacturer} {request?.inventorys?.name} on {request.datePurchased}</header>
                if (gearUserObject.id === request.buyerId && request.requestStatus === "denied")
                    return <header className="deniedRequest">{`${userMatch?.fullName}`}denied your request to buy their {request?.inventorys?.manufacturer} {request?.inventorys?.name} on {request.datePurchased}</header>
                if (gearUserObject.id === request.buyerId && request.requestStatus === "pending") {
                    return <>
                        <footer>Your request to buy {`${userMatch?.fullName}`} {request?.inventorys?.manufacturer} {request?.inventorys?.name} is pending</footer>
                        
                    </>
                }
            })
        }
    </article>
}