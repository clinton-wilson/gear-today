import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
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

    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

    const newList = shuffle(users)

    const requestArray = []


    return <>
        <div className="mainTitleRequest">
            <h2>Received Purchase Requests</h2>
        </div>
        <article className="borrowRequestsContainer">
            {
                purchaseRequests.map((request) => {
                    const userMatch = users.find(({ id }) => id === request.buyerId)

                    if (gearUserObject.id === request.sellerId && request?.requestStatus === "pending") {
                        {
                            { requestArray.push(request) }
                            return <section className="request">
                                <div className="requestPics">
                                    <img className="inventoryPic" src={request?.inventorys?.photo} alt={request?.inventorys?.description}></img>
                                </div>
                                <footer className="requestHeader">{userMatch?.fullName} wants to buy your {request?.inventorys?.manufacturer} {request?.inventorys?.name}</footer>
                                <div className="requestButton">
                                    <button onClick={(clickEvent) => { acceptRequest(clickEvent, request) }} >Accept</button>
                                    <button onClick={(clickEvent) => { denyRequest(clickEvent, request) }}>Deny</button>
                                </div>
                            </section>
                        }

                    }
                }).reverse()
            }
            {
                purchaseRequests.map((request) => {
                    const userMatch = users.find(({ id }) => id === request.buyerId)

                    if (gearUserObject.id === request.sellerId && request.requestStatus === "accepted" || request?.requestStatus === "denied") {
                        { requestArray.push(request) }
                        return <section className="request">
                            <div className="requestPics">
                                <img className="inventoryPic" src={request?.inventorys?.photo} alt={request?.inventorys?.description}></img>
                            </div>
                            <header className="requestHeader">You {request?.requestStatus} {`${userMatch?.fullName}`}'s request to buy your {request?.inventorys?.manufacturer} {request?.inventorys?.name} on {request.dateResponded}</header></section>
                    }


                }).reverse()
            }
            {requestArray.length === 0 ? (<section className="suggestions"><h3>There are no pending requests...</h3>
                <h3>Check out these collections we think you might like</h3>

                <article className="userCollections">

                    {
                        newList.slice(0, 3).map((user) => {
                            if (user.id !== gearUserObject.id)
                                return <><section className="userCollection"><div className="picDiv">
                                    <a href={`/userCollections/${user.id}`}><img className="profilePic" src={user.photo} alt="photo of the user"></img></a>
                                </div><Link to={`/userCollections/${user.id}`}>
                                        <h3 className="detailFooter" >{user.collectionName}</h3>
                                        <footer className="detailFooter" >{user.collectionDescription}</footer>
                                        <footer className="detailFooter" >{user.fullName}'s collection</footer>

                                    </Link></section></>
                        })
                    }
                </article>
            </section>) : ""}
        </article>
    </>
}