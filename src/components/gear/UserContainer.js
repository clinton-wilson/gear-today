import { useState } from "react"
import { FindUser } from "./FindUser"
import "./inventory.css"
import { UserCollections } from "./UserCollections"

export const UserContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return<>
    <FindUser setterFunction = {setSearchTerms}/>
    <UserCollections searchTermState = {searchTerms}/>
    </>

}