import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const SubmittedPurchaseRequests = () => {
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
    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

    const newList = shuffle(users)

    const requestArray = []


    return <>
        <div className="mainTitleRequest">
            <h2>Submitted Purchase Requests</h2>
        </div>
        <article className="borrowRequestsContainer">
            {
                purchaseRequests.map((request) => {
                    const userMatch = users.find(({ id }) => id === request.sellerId)
                    if (gearUserObject.id === request.buyerId && request.requestStatus === "accepted") {
                        { requestArray.push(request) }
                        return <section className="request">
                            <div className="requestPics">
                                <img className="inventoryPic" src={request?.inventorys?.photo} alt={request?.inventorys?.description}></img>
                            </div>
                            <header className="requestHeader">{`${userMatch?.fullName}`} accepted your request to buy their {request?.inventorys?.manufacturer} {request?.inventorys?.name} on {request.dateResponded}</header></section>
                    }
                    if (gearUserObject.id === request.buyerId && request.requestStatus === "denied") {
                        { requestArray.push(request) }
                        return <section className="request">
                            <img className="inventoryPic" src={request?.inventorys?.photo} alt={request?.inventorys?.descriptioin}></img>
                            <header className="requestHeader">{`${userMatch?.fullName}`} denied your request to buy their {request?.inventorys?.manufacturer} {request?.inventorys?.name} on {request.dateResponded}</header></section>
                    }
                    if (gearUserObject.id === request.buyerId && request.requestStatus === "pending") {

                        { requestArray.push(request) }
                        return <section className="request">
                            <img className="inventoryPic" src={request?.inventorys?.photo} alt={request?.inventorys?.descriptioin}></img>
                            <footer className="requestHeader">Your request to buy {`${userMatch?.fullName}`} {request?.inventorys?.manufacturer} {request?.inventorys?.name} is pending</footer>
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
        </article></>
}