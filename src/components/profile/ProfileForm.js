import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./profile.css"
export const ProfileForm = () => {
    const defaultPic ="https://media.istockphoto.com/photos/female-hand-showing-rock-n-roll-sign-or-giving-the-devil-horns-picture-id1055452218?k=20&m=1055452218&s=170667a&w=0&h=41R9b1XJ8eA5liJgJiAzLa7oz6LmvaJV4_lUdrsfJ7A="
    const navigate = useNavigate()
    const localGearUser = localStorage.getItem("gear_user")
    const gearUserObject = JSON.parse(localGearUser)
    const [profile, updateProfile] = useState({
        fullName: "",
        email: "",
        collectionName: "",
        collectionDescription: "",
        photo: defaultPic
    })

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?id=${gearUserObject.id}`)
                .then(res => res.json())
                .then((data) => {
                    const userObject = data[0]
                    updateProfile(userObject)
                })
        },
        []
    )


    const saveNewProfileItem = (event) => {
        event.preventDefault()
        return fetch(`http://localhost:8088/users/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/profile")
            })
    }

    return (
        <article className="profileForm">
            <form className="profileForm">
                <h2 className="profile__title">Edit Profile</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={profile.fullName}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.fullName = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={profile.email}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.email = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="collectionName">Collection Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={profile.collectionName}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.collectionName = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div><div className="form-group">
                        <label htmlFor="collectionDescription">Collection Description:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={profile.collectionDescription}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.collectionDescription = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                <div className="inventoryFormGroup">
                    <label htmlFor="photo">Photo:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Add photo"
                        value={profile.photo}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.photo = evt.target.value
                                updateProfile(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
                <button
                    onClick={(clickEvent) => saveNewProfileItem(clickEvent)}
                    className="myButton">
                    Save Profile
                </button>
            </form>
        </article>
    )
}
