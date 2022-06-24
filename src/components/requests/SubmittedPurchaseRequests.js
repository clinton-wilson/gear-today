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

    return <article className="requestsContainer">
        <div className="mainTitleRequest">
        <h2>Submitted Purchase Requests</h2>
        </div>
        {
            purchaseRequests.map((request) => {
                const userMatch = users.find(({ id }) => id === request.sellerId)
                if (gearUserObject.id === request.buyerId && request.requestStatus === "accepted")
                    return <section className="request">
                        <div className="requestPics">
                            <img className="inventoryPic" src={request?.inventorys?.photo} alt={request?.inventorys?.description}></img>
                        </div>
                        <header className="requestHeader">{`${userMatch?.fullName}`} accepted your request to buy their {request?.inventorys?.manufacturer} {request?.inventorys?.name} on {request.dateResponded}</header></section>
                if (gearUserObject.id === request.buyerId && request.requestStatus === "denied")
                    return <section className="request">
                        <img className="inventoryPic" src={request?.inventorys?.photo} alt={request?.inventorys?.descriptioin}></img> 
                        <header className="requestHeader">{`${userMatch?.fullName}`} denied your request to buy their {request?.inventorys?.manufacturer} {request?.inventorys?.name} on {request.dateResponded}</header></section>
                if (gearUserObject.id === request.buyerId && request.requestStatus === "pending") {
                    return <section className="request">
                        <img className="inventoryPic" src={request?.inventorys?.photo} alt={request?.inventorys?.descriptioin}></img>
                        <footer className="requestHeader">Your request to buy {`${userMatch?.fullName}`} {request?.inventorys?.manufacturer} {request?.inventorys?.name} is pending</footer>
                    </section>
                }
            })
        }
    </article>
}