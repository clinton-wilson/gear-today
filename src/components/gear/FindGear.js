import "./inventory.css"

export const FindGear = ({ setterFunction }) => {
    return (
        <div className="search">
            <input 
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }
                }
                type="text"   placeholder="Search for gear here"/>
        </div>
    )
}