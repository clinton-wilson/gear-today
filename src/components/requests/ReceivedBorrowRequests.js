import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ReceivedBorrowRequests = () => {
    const [requestInventories, setRequestInventories] = useState([])
    const localGearUser = localStorage.getItem("gear_user")
    const gearUserObject = JSON.parse(localGearUser)

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

    return <article className="requestsContainer">
        {
            requestInventories.map((requestInventory) => {
                if (requestInventory?.inventorys.userId === gearUserObject.id && requestInventory?.requestStatus === "pending") {
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
                if (requestInventory?.inventorys.userId === gearUserObject.id && requestInventory?.requestStatus === "accepted")
                    return <section className="request">
                        <div className="requestPics">
                            <img className="inventoryPic" src={requestInventory?.inventorys?.photo} alt={requestInventory?.inventorys?.fullName}></img>
                        </div>
                        <header className="requestHeader">You accepted {requestInventory?.user.fullName}'s request to borrow your {requestInventory?.inventorys.manufacturer} {requestInventory?.inventorys.name} on {requestInventory?.dateBorrowed}</header>
                    </section>
                // if (requestInventory?.inventorys.userId === gearUserObject.id && requestInventory?.requestStatus === "returned")
                //     return <section className="request">
                //         <div className="requestPics">
                //             <img className="inventoryPic" src={requestInventory?.inventorys?.photo} alt={requestInventory?.inventorys?.fullName}></img>
                //         </div>
                //         <header className="requestHeader">{requestInventory?.user.fullName} returned your {requestInventory?.inventorys.manufacturer} {requestInventory?.inventorys.name} on {requestInventory?.dateReturned}</header>
                //     </section>
                if (requestInventory?.inventorys.userId === gearUserObject.id && requestInventory?.requestStatus === "denied")
                return <section className="request">
                        <div className="requestPics">
                            <img className="inventoryPic" src={requestInventory?.inventorys?.photo} alt={requestInventory?.inventorys?.fullName}></img>
                        </div>
                        <header className="requestHeader">You denied {requestInventory?.user.fullName}'s request to borrow your {requestInventory?.inventorys.manufacturer} {requestInventory?.inventorys.name} on {requestInventory?.dateBorrowed}</header>
                    </section>
                    }).reverse()
            
        }
    </article>
}