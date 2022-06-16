import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="#">Inventory</Link>
                <ul>
                    <li>
                        <Link className="navbar__link" to="/inventory">Your Inventory</Link>
                    </li>
                    <li>
                        <Link className="navbar__link" to="/userCollections">User Collections</Link>
                    </li>
                </ul>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="#">Requests</Link>
                <ul>
                    <li>
                        <Link className="navbar__link" to="/receivedRequests">Recieved Requests</Link>
                    </li>
                    <li>
                        <Link className="navbar__link" to="/submittedRequests">Submitted Requests</Link>
                    </li>
                </ul>
            </li>
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("gear_user")
                    navigate("/", { replace: true })
                }}>Logout</Link>
            </li>
        </ul>
    )
}