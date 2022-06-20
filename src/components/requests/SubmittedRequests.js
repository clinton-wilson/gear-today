import { SubmittedBorrowRequests } from "./SubmittedBorrowRequests"
import { SubmittedPurchaseRequests } from "./SubmittedPurchaseRequests"

export const SubmittedRequests = () => {
    return <>
        <h2>Submitted Requests</h2>
        <h3>Borrow Requests</h3>
        <SubmittedBorrowRequests />
        <h3>Purchase Requests</h3>
        <SubmittedPurchaseRequests />
    </>
}