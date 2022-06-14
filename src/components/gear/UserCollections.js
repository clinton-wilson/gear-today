import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export const UserCollections = () => {

    const [users, setUsers] = useState([])
    const localGearUser = localStorage.getItem("gear_user")
    const gearUserObject = JSON.parse(localGearUser)
    const { userId } = useParams()
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
        <h2>User Collections</h2>
        {
            users.map((user) => {
                if (user.id !== gearUserObject.id)
                    return <section className="userCollection">
                        <h3><Link to={`/userCollections/${user.id}`}>{user.collectionName}</Link></h3>
                        <header>{user.collectionDescription}</header>
                        <footer>{user.fullName}'s collection</footer>
                    </section>
            })
        }
    </>
}