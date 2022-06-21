import { useState } from "react"
import { FindGear } from "./FindGear"
import { Inventory } from "./Inventory"
import "./inventory.css"

export const GearContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return<>
    <FindGear setterFunction = {setSearchTerms}/>
    <Inventory searchTermState = {searchTerms}/>
    </>

}