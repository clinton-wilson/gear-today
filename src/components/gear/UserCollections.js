import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import "./userCollections.css"
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
        <h2 className="title" >User Collections</h2>
        <article className="userCollections">
            {
                users.map((user) => {
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
    </>
}