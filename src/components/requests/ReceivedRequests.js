import { ReceivedBorrowRequests } from "./ReceivedBorrowRequests"
import { ReceivedPurchaseRequests } from "./ReceivedPurchaseRequests"

export const ReceivedRequests = () => {
    return <>
        <h2 className="mainTitleRequest">Received Requests</h2>
        <article className="requests">
            <div className="requestContainer">
            <h3 className="titleRequest">Borrow Requests</h3>
            <ReceivedBorrowRequests />
            </div>
            
        </article>
    </>
}
/* <div className="requestContainer">
            <h3 className="titleRequest">Purchase Requests</h3>
            <ReceivedPurchaseRequests className="requestRow" />
            </div> */