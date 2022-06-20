import { useEffect, useState } from "react"

export const SubmittedBorrowRequests = () => {
    const [requestInventories, setRequestInventories] = useState([])
    const [userInventories, setUserInventories] = useState([])
    const localGearUser = localStorage.getItem("gear_user")
    const gearUserObject = JSON.parse(localGearUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/borrowRequests?_expand=inventorys`)
                .then(res => res.json())
                .then((requestData) => {
                    setRequestInventories(requestData)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/inventorys?_expand=user`)
                .then(res => res.json())
                .then((userData) => {
                    setUserInventories(userData)
                })
        },
        []
    )

    
    return <>
        {
            requestInventories?.map((request) => {
                const inventoryMatch = userInventories?.find(({ id }) => id === request.inventorysId)
                if (request.userId === gearUserObject.id && request.requestStatus === "pending") {
                    return <header>You requested to borrow {`${inventoryMatch?.user?.fullName}`}'s {request?.inventorys?.manufacturer} {request?.inventorys?.name}</header>
                }
                if (request.userId === gearUserObject.id && request.requestStatus === "accepted") {
                    return <header>Your request to borrow {`${inventoryMatch?.user?.fullName}`}'s {request?.inventorys?.manufacturer} {request?.inventorys?.name} was accepted</header>
                }
                if (request.userId === gearUserObject.id && request.requestStatus === "denied") {
                    return <header>Your request to borrow {`${inventoryMatch?.user?.fullName}`}'s {request?.inventorys?.manufacturer} {request?.inventorys?.name} was denied</header>
                }
            })
        }
    </>
}