import "./NavBar.css"


export const DropdownNavBar = () => {
<ul>
    <li>
        <a href="/profile">Profile</a>
    </li>
    <li>
        <a href="#">Inventory</a>
        <ul>
            <li><a href="/inventory">Your Inventory</a></li>
            <li><a href="/userCollections">User Collections</a></li>
        </ul>
    </li>
    <li><a href="#">Requests</a></li>
    <ul>
        <li><a href="/submittedRequests">Submitted Requests</a></li>
        <li><a href="/receivedRequests">Received Requests</a></li>
    </ul>
    <li><a href="#">Purchase History</a></li>
    <ul>
        <li><a href="/purchasedGear">Purchased Gear</a></li>
        <li><a href="/soldGear">Sold Gear</a></li>
    </ul>
    <li><a href="#">Logout</a></li>
</ul>












    // const MenuItems = [
    //     {
    //         title: "Profile",
    //         link: "/profile"
    //     },
    //     {
    //         title: "Inventory",
    //         submenu: [
    //             {
    //                 title: "Your Inventory",
    //                 link: "/inventory"
    //             },
    //             {
    //                 title: "User Collections",
    //                 link: "/userCollections"
    //             }
    //         ]
    //     },
    //     {
    //         title: "Requests",
    //         submenu: [
    //             {
    //                 title: "Submitted Requests",
    //                 link: "/submittedRequests"
    //             },
    //             {
    //                 title: "Received Requests",
    //                 link: "/receivedRequests"
    //             }
    //         ]
    //     },
    //     {
    //         title: "Purchase History",
    //         submenu: [
    //             {
    //                 title: "Purchased Gear",
    //                 link: "/purchasedGear"
    //             },
    //             {
    //                 title: "Sold Gear",
    //                 link: "/soldGear"
    //             }
    //         ]
    //     },
    //     {
    //         title: "Logout",
    //         link: "#"
    //     }
    // ]
    // return (
    //     <nav>
    //         <ul className="menus">
    //             {
    //                 MenuItems.map((menu, index) => {
    //                     return <Menu items={menu} key={index} />
    //                 })
    //             }
    //         </ul>
    //     </nav>
    // )
}