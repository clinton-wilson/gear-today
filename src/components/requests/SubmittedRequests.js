import { SubmittedBorrowRequests } from "./SubmittedBorrowRequests"
import { SubmittedPurchaseRequests } from "./SubmittedPurchaseRequests"

export const SubmittedRequests = () => {
    return <>
        <h2 className="mainTitleRequest">Submitted Requests</h2>
        <article className="requests">
            <div className="requestContainer">
                <h3 className="titleRequest">Borrow Requests</h3>
                <SubmittedBorrowRequests className="requestRow" />
            </div>
            {/* <div className="requestContainer">
                <h3 className="titleRequest">Purchase Requests</h3>
                <SubmittedPurchaseRequests className="requestRow" />
            </div> */}
        </article>
    </>
}