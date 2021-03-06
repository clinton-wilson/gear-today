import { Route, Routes } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { DropdownNavBar } from "./nav/DropdownNavBar"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./views/ApplicationViews"
import { Authorized } from "./views/Authorized"

export const GearToday = () => {
    return <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={
            <Authorized>
                <>
                    <header className="logo">GearToday
                    <div className="gone">...gone tomorrow!</div>
                    {/* <div className="track">Keep track of your gear today!</div> */}
                    </header>
                    <header>
                        <NavBar />
                    </header>
                    <ApplicationViews />
                </>
            </Authorized>

        } />
    </Routes>
}