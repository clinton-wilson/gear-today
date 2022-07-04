import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import "./userCollections.css"
export const UserCollections = ({ searchTermState }) => {

    const [users, setUsers] = useState([])
    const localGearUser = localStorage.getItem("gear_user")
    const gearUserObject = JSON.parse(localGearUser)
    const [foundUser, setFoundUser] = useState([])

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
            fetch(`http://localhost:8088/users`)
                .then(res => res.json())
                .then((userData) => {
                    setFoundUser(userData)
                })
        },
        []
    )
    
    useEffect(
        () => {
            const searchedUser = users.filter(user => {
                return user.fullName.toLowerCase().startsWith(searchTermState.toLowerCase()) || user.collectionName.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFoundUser(searchedUser)
        },
        [searchTermState]
    )
    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

    const newList = shuffle(foundUser)

    return <>
        <h2 className="title" >User Collections</h2>
        <article className="userCollections">

            {
                newList.map((user) => {
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