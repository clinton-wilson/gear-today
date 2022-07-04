import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const ReceivedBorrowRequests = () => {
    const [requestInventories, setRequestInventories] = useState([])
    const localGearUser = localStorage.getItem("gear_user")
    const gearUserObject = JSON.parse(localGearUser)
    const [users, setUsers] = useState([])

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
            fetch(`http://localhost:8088/borrowRequests?_expand=inventorys&_expand=user`)
                .then(res => res.json())
                .then((requestData) => {
                    setRequestInventories(requestData)
                })
        },
        []
    )
    const acceptRequest = (event, request) => {
        event.preventDefault()

        const requestsToAPI = {
            userId: request.userId,
            inventorysId: request.inventorysId,
            requestStatus: "accepted",
            dateBorrowed: new Date().toLocaleDateString(),
            dateResponded: ""
        }
        fetch(`http://localhost:8088/borrowRequests/${request.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestsToAPI)
        })
            .then(res => res.json())
            .then(() => {
                const inventoryToAPI = {
                    userId: request.inventorys.userId,
                    gearTypeId: request.inventorys.gearTypeId,
                    name: request.inventorys.name,
                    manufacturer: request.inventorys.manufacturer,
                    description: request.inventorys.description,
                    photo: request.inventorys.photo,
                    lentOut: true
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
                fetch(`http://localhost:8088/borrowRequests?_expand=inventorys&_expand=user`)
                    .then(res => res.json())
                    .then((requestData) => {
                        setRequestInventories(requestData)
                    })
            })
    }
    const denyRequest = (event, request) => {
        event.preventDefault()

        const requestsToAPI = {
            userId: request.userId,
            inventorysId: request.inventorysId,
            requestStatus: "denied",
            dateBorrowed: new Date().toLocaleDateString(),
            dateResponded: ""
        }
        fetch(`http://localhost:8088/borrowRequests/${request.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestsToAPI)
        })
            .then(res => res.json())
            .then(() => {
                fetch(`http://localhost:8088/borrowRequests?_expand=inventorys&_expand=user`)
                    .then(res => res.json())
                    .then((requestData) => {
                        setRequestInventories(requestData)
                    })
            })
    }

    const returnedItem = (event, item) => {
        event.preventDefault()

        const returnedRequestToAPI = {
            userId: item.userId,
            gearTypeId: item.gearTypeId,
            inventorysId: item.inventorysId,
            requestStatus: "returned",
            requestId: item.id,
            dateBorrowed: item.dateBorrowed,
            dateReturned: new Date().toLocaleDateString()
        }



        fetch(`http://localhost:8088/returnedGear`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(returnedRequestToAPI)
        })
            .then(res => res.json())
            .then(() => {
                const returnedItemToAPI = {
                    userId: item.inventorys.userId,
                    gearTypeId: item.inventorys.gearTypeId,
                    name: item.inventorys.name,
                    manufacturer: item.inventorys.manufacturer,
                    description: item.inventorys.description,
                    photo: item.inventorys.photo,
                    lentOut: false
                }
                return fetch(`http://localhost:8088/inventorys/${item?.inventorys?.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(returnedItemToAPI)
                })
                    .then(res => res.json())
                    .then(() => {
                        fetch(`http://localhost:8088/borrowRequests/${item.id}`, {
                            method: "DELETE"
                        })
                    })
            })
            .then(() => {
                fetch(`http://localhost:8088/borrowRequests?_expand=inventorys&_expand=user`)
                    .then(res => res.json())
                    .then((requestData) => {
                        setRequestInventories(requestData)
                    })
                    .then(() => {
                        fetch(`http://localhost:8088/inventorys`)
                            .then(res => res.json())
                            .then((inventoryData) => {
                                setRequestInventories(inventoryData)
                            })
                    })
            })
    }

    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

    const newList = shuffle(users)

    const requestArray = []

    return <article className="borrowRequestsContainer">
        {
            requestInventories.map((requestInventory) => {
                if (requestInventory?.inventorys?.userId === gearUserObject.id && requestInventory?.requestStatus === "pending") {
                    { requestArray.push(requestInventory) }
                    return <section className="request">
                        <div className="requestPics">
                            <img className="inventoryPic" src={requestInventory?.inventorys?.photo} alt={requestInventory?.inventorys?.fullName}></img>
                        </div>
                        <header className="requestHeader">{requestInventory?.user.fullName} wants to borrow your {requestInventory?.inventorys.manufacturer} {requestInventory?.inventorys.name}</header>
                        <div className="requestButton">
                            <button onClick={(clickEvent) => { acceptRequest(clickEvent, requestInventory) }} >Accept</button>
                            <button onClick={(clickEvent) => { denyRequest(clickEvent, requestInventory) }}>Deny</button>
                        </div>
                    </section>
                }
            }).reverse()
        }
        {
            requestInventories.map((requestInventory) => {
                if (requestInventory?.inventorys?.userId === gearUserObject.id && requestInventory?.requestStatus === "accepted") {
                    { requestArray.push(requestInventory) }
                    return <section className="request">
                        <div className="requestPics">
                            <img className="inventoryPic" src={requestInventory?.inventorys?.photo} alt={requestInventory?.inventorys?.fullName}></img>
                        </div>
                        <header className="requestHeader">You accepted {requestInventory?.user.fullName}'s request to borrow your {requestInventory?.inventorys?.manufacturer} {requestInventory?.inventorys?.name} on {requestInventory?.dateBorrowed}</header>
                        <button onClick={(clickEvent) => { returnedItem(clickEvent, requestInventory) }} >Item returned</button>
                    </section>
                }
                // if (requestInventory?.inventorys.userId === gearUserObject.id && requestInventory?.requestStatus === "returned")
                //     return <section className="request">
                //         <div className="requestPics">
                //             <img className="inventoryPic" src={requestInventory?.inventorys?.photo} alt={requestInventory?.inventorys?.fullName}></img>
                //         </div>
                //         <header className="requestHeader">{requestInventory?.user.fullName} returned your {requestInventory?.inventorys.manufacturer} {requestInventory?.inventorys.name} on {requestInventory?.dateReturned}</header>
                //     </section>
                if (requestInventory?.inventorys?.userId === gearUserObject.id && requestInventory?.requestStatus === "denied") {
                    { requestArray.push(requestInventory) }
                    return <section className="request">
                        <div className="requestPics">
                            <img className="inventoryPic" src={requestInventory?.inventorys?.photo} alt={requestInventory?.inventorys?.fullName}></img>
                        </div>
                        <header className="requestHeader">You denied {requestInventory?.user?.fullName}'s request to borrow your {requestInventory?.inventorys?.manufacturer} {requestInventory?.inventorys?.name} on {requestInventory?.dateBorrowed}</header>
                    </section>
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
}