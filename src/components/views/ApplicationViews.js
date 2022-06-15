import { Outlet, Route, Routes } from "react-router-dom"
import { CollectionList } from "../gear/CollectionList"
import { GearDetails } from "../gear/GearDetails"
import { Inventory } from "../gear/Inventory"
import { InventoryDetails } from "../gear/InventoryDetails"
import { InventoryForm } from "../gear/InventoryForm"
import { UserCollections } from "../gear/UserCollections"
import { Profile } from "../profile/Profile"
import { ProfileForm } from "../profile/ProfileForm"

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
                <Route path="profile" element={<Profile />} />
                <Route path="profile/updateProfile" element={<ProfileForm />} />
                <Route path="userCollections" element={<UserCollections />} />
                <Route path="userCollections/:userId" element={<CollectionList />} />
                <Route path="gearDetails/:inventoryId" element={<GearDetails />} />
                <Route path="inventoryDetails/:inventoryId" element={<InventoryDetails />} />
                
            </Route>
        </Routes>
    )
}