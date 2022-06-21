import { useEffect, useState } from "react"

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
            datePurchased: new Date().toLocaleDateString(),
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
            datePurchased: "",
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

    return <article className="purchaseRequest">
        {
            purchaseRequests.map((request) => {
                const userMatch = users.find(({ id }) => id === request.buyerId)
                if (gearUserObject.id === request.sellerId && request.requestStatus === "accepted")
                    return <header className="acceptedRequest">You accepted {`${userMatch?.fullName}`}'s request to buy your {request?.inventorys?.manufacturer} {request?.inventorys?.name} on {request.datePurchased}</header>
                    if (gearUserObject.id === request.sellerId && request.requestStatus === "denied")
                    return <header className="deniedRequest">You denied {`${userMatch?.fullName}`}'s request to buy your {request?.inventorys?.manufacturer} {request?.inventorys?.name} on {request.datePurchased}</header>
                if (gearUserObject.id === request.sellerId) {
                    return <>
                        <footer>{`${userMatch.fullName}`} wants to buy your {request?.inventorys?.manufacturer} {request?.inventorys?.name}</footer>
                        <button onClick={(clickEvent) => { acceptRequest(clickEvent, request) }} >Accept</button>
                        <button onClick={(clickEvent) => { denyRequest(clickEvent, request) }}>Deny</button>
                    </>
                }
            })
        }
    </article>
}