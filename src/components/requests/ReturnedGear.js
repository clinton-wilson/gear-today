import { useEffect, useState } from "react"
import "./returns.css"

export const ReturnedGear = () => {
const [returnedGear, setReturnedGear] = useState([])
const [users, setUsers] = useState([])
const localGearUser = localStorage.getItem("gear_user")
const gearUserObject = JSON.parse(localGearUser)
useEffect(
    () => {
        fetch(`http://localhost:8088/returnedGear?_expand=user&_expand=inventorys`)
        .then(res => res.json())
        .then((data) => {
            setReturnedGear(data)
        })
    }
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

    return <>
      <div className="mainTitleRequest">
        <h2>Returned Gear</h2>
        </div>
    <article className="returns">
    {
        returnedGear.map((gear) => {
            const userMatch = users?.find(({ id }) => id === gear?.inventorys?.userId)
            if (gear.userId === gearUserObject.id) {
                return <section className="returnedItem">
                    <img className="inventoryPic" src={gear?.inventorys?.photo} alt={gear?.inventorys?.description}></img>
                    <header className="returnHeader" >You returned {userMatch?.fullName}'s {gear?.inventorys?.manufacturer} {gear?.inventorys?.name} on {gear?.dateReturned}</header>
                    </section>
            }
            else if (gear.inventorys.userId === gearUserObject.id) {
                return <section className="returnedItem">
                    <img className="inventoryPic" src={gear?.inventorys?.photo} alt={gear?.inventorys?.description}></img>
                    <header className="returnHeader">{gear?.user?.fullName} your returned {gear?.inventorys?.manufacturer} {gear?.inventorys?.name} to you on {gear?.dateReturned}</header>
                    </section>
            }
            else {
                return
                <header>There are no returns</header>
            }
        }).reverse()
    }
    </article>
</>
}
