import { Outlet, Route, Routes } from "react-router-dom"
import { Inventory } from "../gear/Inventory"
import { InventoryForm } from "../gear/InventoryForm"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={
               <>
               <h1>GearToday</h1>
               <div>Keep track of your gear today!</div>

               <Outlet />
               </> 
            }>

            <Route path="inventory" element={<Inventory />} />
            <Route path="inventory/inventoryForm" element={<InventoryForm />} />

            </Route>
        </Routes>
    )
}