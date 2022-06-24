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


    return <article className="requestsContainer">

        {
            requestInventories?.map((request) => {
                const inventoryMatch = userInventories?.find(({ id }) => id === request?.inventorysId)
                if (request?.userId === gearUserObject.id && request?.requestStatus === "pending") {
                    return <section className="request">
                        <div className="requestPics">
                            <img className="inventoryPic" src={request?.inventorys?.photo}
                                alt={request?.inventorys?.description}></img>
                        </div>
                        <header className="requestHeader">Your request to borrow {`${inventoryMatch?.user?.fullName}`}'s {request?.inventorys?.manufacturer} {request?.inventorys?.name} is pending</header>
                    </section>
                }
                

               
            })
        }
    </article>
}