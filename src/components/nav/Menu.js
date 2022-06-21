import { useState } from "react"
import { Dropdown } from "./Dropdown"

export const Menu = ({ items }) => {
    
    const [dropdown, setDropdown] = useState(false)
    return (
        <li className="menu-items">
            {items.submenu ? (
                <>
                    <button type="button" aria-haspopup="menu" aria-expanded={dropdown ? "true" : "false"} onMouseOver={() => setDropdown((prev) => !prev)}>
                        {items.title}{" "}
                    </button>
                    <Dropdown submenus={items.submenu} dropdown={dropdown}/>
                </>
            ) : (
                <a href={items.link}>{items.title}</a>
            )}
        </li>
    )
}