import { useEffect, useState } from "react"

export const Requests = () => {
    const [requests, setRequests] = useState([])
    const localGearUser = localStorage.getItem("gear_user")
    const gearUserObject = JSON.parse(localGearUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/inventorys?_embed=borrowRequests`)
            .then(res => res.json())
            .then((requestData) => {
                setRequests(requestData)
            })
        },
        []
    )
}