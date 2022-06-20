import { ReceivedBorrowRequests } from "./ReceivedBorrowRequests"
import { ReceivedPurchaseRequests } from "./ReceivedPurchaseRequests"

export const ReceivedRequests = () => {
    return <>
    <h2>Received Requests</h2>
    <h3>Borrow Requests</h3>
    <ReceivedBorrowRequests />
    <h3>Purchase Requests</h3>
    <ReceivedPurchaseRequests />
    </>
}