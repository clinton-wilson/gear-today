import { Outlet, Route, Routes } from "react-router-dom"
import { CollectionList } from "../gear/CollectionList"
import { GearEditForm } from "../gear/EditGearForm"
import { GearContainer } from "../gear/GearContainer"
import { GearDetails } from "../gear/GearDetails"
import { InventoryDetails } from "../gear/InventoryDetails"
import { InventoryForm } from "../gear/InventoryForm"
import { UserCollections } from "../gear/UserCollections"
import { Profile } from "../profile/Profile"
import { ProfileForm } from "../profile/ProfileForm"
import { PurchasedGear } from "../purchases/PurchasedGear"
import { SoldGear } from "../purchases/SoldGear"
import { ReceivedRequests } from "../requests/ReceivedRequests"
import { SubmittedRequests } from "../requests/SubmittedRequests"
import { ReturnedGear } from "../requests/ReturnedGear"
import { SubmittedPurchaseRequests } from "../requests/SubmittedPurchaseRequests"
import { ReceivedPurchaseRequests } from "../requests/ReceivedPurchaseRequests"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet />
                </>
            }>

                <Route path="inventory" element={<GearContainer />} />
                <Route path="inventory/inventoryForm" element={<InventoryForm />} />
                <Route path="profile" element={<Profile />} />
                <Route path="profile/updateProfile" element={<ProfileForm />} />
                <Route path="userCollections" element={<UserCollections />} />
                <Route path="userCollections/:userId" element={<CollectionList />} />
                <Route path="gearDetails/:inventoryId" element={<GearDetails />} />
                <Route path="inventoryDetails/:inventoryId" element={<InventoryDetails />} />
                <Route path="receivedBorrowRequests" element={<ReceivedRequests />} />
                <Route path="submittedBorrowRequests" element={<SubmittedRequests/>} />
                <Route path="soldGear" element={<SoldGear />} />
                <Route path="purchasedGear" element={<PurchasedGear/>} />
                <Route path="editGearForm/:inventoryId" element={<GearEditForm/>} />
                <Route path="returnedGear" element={<ReturnedGear/>} />
                <Route path="receivedPurchaseRequests" element={<ReceivedPurchaseRequests/>} />
                <Route path="submittedPurchaseRequests" element={<SubmittedPurchaseRequests/>} />
            </Route>
        </Routes>
    )
}