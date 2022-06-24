import { Link, useNavigate } from "react-router-dom"
// import "./NavBar.css"

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
                <Link className="navbar__link" to="#">Borrowed Gear</Link>
                <ul>
                    <li>
                        <Link className="navbar__link" to="/receivedBorrowRequests">Recieved Borrow Requests</Link>
                    </li>
                    <li>
                        <Link className="navbar__link" to="/submittedBorrowRequests">Submitted Borrow Requests</Link>
                    </li>
                    <li>
                        <Link className="navbar__link" to="/returnedGear">Returned Gear</Link>
                    </li>
                </ul>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="#">Purchase History</Link>
                <ul>
                <li>
                        <Link className="navbar__link" to="/receivedPurchaseRequests">Received Purchase Requests</Link>
                    </li>
                    <li>
                        <Link className="navbar__link" to="/submittedPurchaseRequests">Submitted Purchase Requests</Link>
                    </li>
                    <li>
                        <Link className="navbar__link" to="/soldGear">Sold Gear</Link>
                    </li>
                    <li>
                        <Link className="navbar__link" to="/purchasedGear">Purchased Gear</Link>
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