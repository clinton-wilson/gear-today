import { ReceivedBorrowRequests } from "./ReceivedBorrowRequests"
import { ReceivedPurchaseRequests } from "./ReceivedPurchaseRequests"

export const ReceivedRequests = () => {
    return <>
        <div className="mainTitleRequest">
            <h2>Received Borrow Requests</h2>
        </div>
        <article className="requests">
            <div className="requestContainer">
                {/* <h3 className="titleRequest">Borrow Requests</h3> */}
                <ReceivedBorrowRequests />
            </div>

        </article>
    </>
}
