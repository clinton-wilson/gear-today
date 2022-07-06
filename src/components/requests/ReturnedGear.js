import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./returns.css"

export const ReturnedGear = () => {
    const [returnedGear, setReturnedGear] = useState([])
    const [users, setUsers] = useState([])
    const localGearUser = localStorage.getItem("gear_user")
    const gearUserObject = JSON.parse(localGearUser)
    const [inventories, setInventories] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/returnedGear?_expand=user&_expand=inventorys`)
                .then(res => res.json())
                .then((data) => {
                    setReturnedGear(data)
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
    useEffect(
        () => {
            fetch(`http://localhost:8088/inventorys`)
                .then(res => res.json())
                .then((userData) => {
                    setInventories(userData)
                })
        },
        []
    )
    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

    const newList = shuffle(inventories)

    const requestArray = []

    return <>
        <div className="mainTitleRequest">
            <h2>Returned Gear</h2>
        </div>
        <article className="borrowRequestsContainer">
            {
                returnedGear.map((gear) => {
                    const userMatch = users?.find(({ id }) => id === gear?.inventorys?.userId)
                    if (gear.userId === gearUserObject.id) {
                        { requestArray.push(gear) }
                        return <section className="returnedItem">
                            <img className="inventoryPic" src={gear?.inventorys?.photo} alt={gear?.inventorys?.description}></img>
                            <header className="returnHeader" >You returned {userMatch?.fullName}'s {gear?.inventorys?.manufacturer} {gear?.inventorys?.name} on {gear?.dateReturned}</header>
                        </section>
                    }
                    if (gear.inventorys.userId === gearUserObject.id) {
                        { requestArray.push(gear) }
                        return <section className="returnedItem">
                            <img className="inventoryPic" src={gear?.inventorys?.photo} alt={gear?.inventorys?.description}></img>
                            <header className="returnHeader">{gear?.user?.fullName} your returned {gear?.inventorys?.manufacturer} {gear?.inventorys?.name} to you on {gear?.dateReturned}</header>
                        </section>
                    }
                }).reverse()
            }
            {requestArray.length === 0 ? (<section className="suggestions"><h3>You haven't sold any gear...</h3>
                <h3>Check out these selections you might like</h3>

                <article className="userCollections">

                    {
                        newList.slice(0, 3).map((inventory) => {
                            if (inventory.userId !== gearUserObject.id)
                                return <>
                                    <Link to={`/inventoryDetails/${inventory.id}`}><section className="inventory">
                                        <img className="inventoryPic" src={inventory.photo} alt={inventory.description}></img>
                                        <header className="inventory__header">{inventory.manufacturer} {inventory.name}</header>
                                    </section>
                                    </Link>
                                </>
                        })
                    }
                </article>
            </section>) : ""}
        </article>
    </>
}
