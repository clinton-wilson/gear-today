import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Profile = () => {
    const [users, setUsers] = useState([])
    const localGearUser = localStorage.getItem("gear_user")
    const gearUserObject = JSON.parse(localGearUser)
    const navigate = useNavigate()

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
        <h2>Your Profile</h2>
        <article className="inventories">
            {
                users.map((user) => {
                    if (user.id === gearUserObject.id) {
                        return <section className="profile">
                            <header className="profile__header">Name: {user.fullName}</header>
                            <footer className="profile__footer">Email: {user.email}</footer>
                            <footer className="profile__footer">Collection Name: {user.collectionName}</footer>
                            <footer className="profile__footer">Collection Description: {user.collectionDescription}</footer>
                        </section>
                    }
                })
            }
        </article>
        <button className="myButton" onClick={() => navigate("/profile/updateProfile")}>Update Profile</button>
    </>
}