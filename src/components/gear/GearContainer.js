import { useState } from "react"
import { FindGear } from "./FindGear"
import { Inventory } from "./Inventory"

export const GearContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return<>
    <FindGear setterFunction = {setSearchTerms}/>
    <Inventory searchTermState = {searchTerms}/>
    </>

}