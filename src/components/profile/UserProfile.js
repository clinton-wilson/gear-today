import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./profile.css"
export const UserProfile = () => {
    const { userId } = useParams()
    const [user, setUser] = useState([])
    const navigate = useNavigate()
    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${userId}`)
                .then(res => res.json())
                .then((userData) => {
                    setUser(userData)
                })
        },
        [userId]
    )
    return <section className="profiles">
        <div className="picBG">
            <img className="profilePic" src={user.photo} alt="photo of the user"></img>
        </div>
        <article>
            <section className="profile">
                <header className="profile__header">Name: {user.fullName}</header>
                <footer className="profile__footer">Email: {user.email}</footer>
                <footer className="profile__footer">Collection Name: {user.collectionName}</footer>
                <footer className="profile__footer">Collection Description: {user.collectionDescription}</footer>
            </section>
            <button onClick={() => { navigate(`/userCollections/${userId}`) }} className="backButton">Back to Collection</button>
        </article>
    </section>
}