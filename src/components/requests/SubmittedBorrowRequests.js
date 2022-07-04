import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserCollections } from "../gear/UserCollections"

export const SubmittedBorrowRequests = () => {
    const [requestInventories, setRequestInventories] = useState([])
    const [userInventories, setUserInventories] = useState([])
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

    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

    const newList = shuffle(users)

    const requestArray = []

    return <article className="requestsContainer">
        {requestInventories.length > 0 ? requestInventories?.map((request) => {
            const inventoryMatch = userInventories?.find(({ id }) => id === request?.inventorysId)
            if (request?.userId === gearUserObject.id && request?.requestStatus === "pending") {
                    {requestArray.push(request)}
                return <section className="request">
                    <div className="requestPics">
                        <img className="inventoryPic" src={request?.inventorys?.photo}
                            alt={request?.inventorys?.description}></img>
                    </div>
                    <header className="requestHeader">Your request to borrow {`${inventoryMatch?.user?.fullName}`}'s {request?.inventorys?.manufacturer} {request?.inventorys?.name} is pending</header>
                </section>
            }
            if (request?.userId === gearUserObject.id && request?.requestStatus === "accepted") {
                {requestArray.push(request)}
            return <section className="request">
                <div className="requestPics">
                    <img className="inventoryPic" src={request?.inventorys?.photo}
                        alt={request?.inventorys?.description}></img>
                </div>
                <header className="requestHeader">You have been borrowing {`${inventoryMatch?.user?.fullName}`}'s {request?.inventorys?.manufacturer} {request?.inventorys?.name} since {request?.dateBorrowed}</header>
            </section>
        }

        }) : <h2>There are no pending requests...</h2>
        }

        {requestArray.length === 0 ? (<><h3>There are no pending requests...</h3>
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
            </>) : ""}



    </article>
}