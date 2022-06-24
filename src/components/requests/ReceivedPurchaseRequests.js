import { useEffect, useState } from "react"
import "./request.css"

export const ReceivedPurchaseRequests = () => {
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

    const acceptRequest = (event, request) => {
        event.preventDefault()

        const requestsToAPI = {
            buyerId: request.buyerId,
            sellerId: request.sellerId,
            inventorysId: request.inventorysId,
            dateResponded: new Date().toLocaleDateString(),
            requestStatus: "accepted"
        }
        fetch(`http://localhost:8088/purchases/${request.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestsToAPI)
        })
            .then(res => res.json())
            .then(() => {
                const inventoryToAPI = {
                    userId: request.buyerId,
                    gearTypeId: request.inventorys.gearTypeId,
                    name: request.inventorys.name,
                    manufacturer: request.inventorys.manufacturer,
                    description: request.inventorys.description,
                    photo: request.inventorys.photo,
                    lentOut: false
                }
                return fetch(`http://localhost:8088/inventorys/${request?.inventorys?.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(inventoryToAPI)
                })
                    .then(res => res.json())
            })
            .then(() => {
                fetch(`http://localhost:8088/purchases?_expand=inventorys`)
                    .then(res => res.json())
                    .then((requestData) => {
                        setPurchaseRequests(requestData)
                    })
            })
    }
    const denyRequest = (event, request) => {
        event.preventDefault()

        const requestsToAPI = {
            buyerId: request.buyerId,
            sellerId: request.sellerId,
            inventorysId: request.inventorysId,
            dateResponded: new Date().toLocaleDateString(),
            requestStatus: "denied"
        }
        fetch(`http://localhost:8088/purchases/${request.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestsToAPI)
        })
            .then(res => res.json())
            .then(() => {
                fetch(`http://localhost:8088/purchases?_expand=inventorys`)
                    .then(res => res.json())
                    .then((requestData) => {
                        setPurchaseRequests(requestData)
                    })
            })
    }

    return <article className="requestsContainer">
        <div className="mainTitleRequest">
        <h2>Received Purchase Requests</h2>
        </div>
    {   
        purchaseRequests.map((request) => {
            const userMatch = users.find(({ id }) => id === request.buyerId)
            if (gearUserObject.id === request.sellerId && request?.requestStatus === "pending") {
                return <article className="requests">
                    <section className="request">
                    <div className="requestPics">
                        <img className="inventoryPic" src={request?.inventorys?.photo} alt={request?.inventorys?.description}></img>
                    </div>
                    <footer className="requestHeader">{userMatch?.fullName} wants to buy your {request?.inventorys?.manufacturer} {request?.inventorys?.name}</footer>
                    <div className="requestButton">
                    <button onClick={(clickEvent) => { acceptRequest(clickEvent, request) }} >Accept</button>
                    <button onClick={(clickEvent) => { denyRequest(clickEvent, request) }}>Deny</button>
                </div>
                </section>
                </article>
            }
        }).reverse()
    }
        {
            purchaseRequests.map((request) => {
                const userMatch = users.find(({ id }) => id === request.buyerId)
                if (gearUserObject.id === request.sellerId && request.requestStatus === "accepted" || request?.requestStatus === "denied")
                    return <section className="request">
                        <div className="requestPics">
                            {/* <img className="requestPic" src={`${userMatch?.photo}`} alt={request?.user?.description}></img> */}
                            <img className="inventoryPic" src={request?.inventorys?.photo} alt={request?.inventorys?.description}></img>
                        </div>
                        <header className="requestHeader">You {request?.requestStatus} {`${userMatch?.fullName}`}'s request to buy your {request?.inventorys?.manufacturer} {request?.inventorys?.name} on {request.dateResponded}</header></section>
                
                // if (gearUserObject.id === request.sellerId) {
                //     return <section className="request">
                //         <div className="requestPics">
                //             {/* <img className="requestPic" src={`${userMatch?.photo}`} alt={request?.user?.description}></img> */}
                //             <img className="inventoryPic" src={request?.inventorys?.photo} alt={request?.inventorys?.description}></img>
                //         </div>
                //         <footer className="requestHeader">{userMatch.fullName} wants to buy your {request?.inventorys?.manufacturer} {request?.inventorys?.name}</footer>
                //         <div className="requestButton">
                //         <button onClick={(clickEvent) => { acceptRequest(clickEvent, request) }} >Accept</button>
                //         <button onClick={(clickEvent) => { denyRequest(clickEvent, request) }}>Deny</button>
                //     </div>
                //     </section>
                // }
            })
        }
        </article>
}