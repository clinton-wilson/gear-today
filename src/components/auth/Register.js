
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
export const Register = (props) => {
    const defaultPic ="https://media.istockphoto.com/photos/female-hand-showing-rock-n-roll-sign-or-giving-the-devil-horns-picture-id1055452218?k=20&m=1055452218&s=170667a&w=0&h=41R9b1XJ8eA5liJgJiAzLa7oz6LmvaJV4_lUdrsfJ7A="

    const [user, setUser] = useState({
        email: "",
        fullName: "",
        collectionName: "",
        collectionDescription: "",
        photo: defaultPic
    })
    let navigate = useNavigate()
    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("gear_user", JSON.stringify({
                        id: createdUser.id
                    }))
                    navigate("/inventory")
                }
            })
    }
    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }
    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }
    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for GearToday</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input maxlength="30" onChange={updateUser}
                           type="text" id="fullName" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="collectionName"> Collection Name </label>
                    <input maxlength="30" onChange={updateUser}
                        type="text" id="collectionName" className="form-control"
                        placeholder="Collection Name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="collectionDescription"> Collection Description </label>
                    <input onChange={updateUser}
                        type="textArea" maxlength="75" id="collectionDescription" className="form-control"
                        placeholder="Describe your collection" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="photoDescription"> Photo Description </label>
                    <input onChange={updateUser}
                        type="textArea" id="photoDescription" className="form-control"
                        placeholder="Upload photo" />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}