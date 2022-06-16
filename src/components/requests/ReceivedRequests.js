import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ReceivedRequests = () => {
    const [requestInventories, setRequestInventories] = useState([])
    const [requests, setRequests] = useState({
        requestStatus: "accepted",
        dateBorrowed: Date.now(),
    })
    const localGearUser = localStorage.getItem("gear_user")
    const gearUserObject = JSON.parse(localGearUser)
    const navigate = useNavigate()

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
            dateReturned: ""
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
    const denyRequest = (event, request) => {
        event.preventDefault()

        const requestsToAPI = {
            userId: request.userId,
            inventorysId: request.inventorysId,
            requestStatus: "denied",
            dateBorrowed: new Date().toLocaleDateString(),
            dateReturned: ""
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

    return <>
        {
            requestInventories.map((requestInventory) => {
                if (requestInventory.inventorys.userId === gearUserObject.id && requestInventory.requestStatus === "accepted")
                    return <header className="acceptedRequest">You accepted {requestInventory.user.fullName}'s request to borrow your {requestInventory.inventorys.manufacturer} {requestInventory.inventorys.name} on {requestInventory.dateBorrowed}</header>
                if (requestInventory.inventorys.userId === gearUserObject.id && requestInventory.requestStatus === "denied")
                    return <header className="deniedRequest">You denied {requestInventory.user.fullName}'s request to borrow your {requestInventory.inventorys.manufacturer} {requestInventory.inventorys.name} on {requestInventory.dateBorrowed}</header>
                if (requestInventory.inventorys.userId === gearUserObject.id) {
                    return <>
                        <header className="receivedRequest">{requestInventory.user.fullName} wants to borrow your {requestInventory.inventorys.manufacturer} {requestInventory.inventorys.name}</header>
                        <button onClick={(clickEvent) => { acceptRequest(clickEvent, requestInventory) }} >Accept</button>
                        <button onClick={(clickEvent) => { denyRequest(clickEvent, requestInventory) }}>Deny</button>
                    </>
                }
            })
        }
    </>
}