import { SubmittedBorrowRequests } from "./SubmittedBorrowRequests"
import { SubmittedPurchaseRequests } from "./SubmittedPurchaseRequests"

export const SubmittedRequests = () => {
    return <>
        <div className="mainTitleRequest">
            <h2>Submitted Borrow Requests</h2>
        </div>
        <article className="requests">
            <div className="requestContainer">
                <SubmittedBorrowRequests className="requestRow" />
            </div>
        </article>
    </>
}