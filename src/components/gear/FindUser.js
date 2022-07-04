import "./inventory.css"

export const FindUser = ({ setterFunction }) => {
    return (
        <div className="search">
            <input 
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }
                }
                type="text"   placeholder="Search for collection here"/>
        </div>
    )
}