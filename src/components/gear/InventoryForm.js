import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const InventoryForm = () => {
    const navigate = useNavigate()
    const localGearUser = localStorage.getItem("gear_user")
    const gearUserObject = JSON.parse(localGearUser)
    const [userInventory, setUserInventories] = useState()
    const [newInventory, updateInventories] = useState({
        gearTypeId: 0,
        name: "",
        manufacturer: "",
        description: "",
        photo: ""
    })

    useEffect(
        () => {
            fetch(`http://localhost:8088/inventorys?_expand=gearType&_expand=user`)
            .then(res => res.json())
            .then((userInventory) => {
                setUserInventories(userInventory)
            })
        },
        []
    )
    return (
        <form className="inventoryForm">
            <h2>New Inventory Form</h2>
            <fieldset>
                <div className="inventoryFormGroup">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Gear Name"
                        value={newInventory.name}
                        onChange={
                            (evt) => {
                                const copy = { ...newInventory }
                                copy.name = evt.target.value
                                updateInventories(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="inventoryFormGroup">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Employee email"
                        value={newInventory.email}
                        onChange={
                            (evt) => {
                                const copy = { ...newInventory }
                                copy.email = evt.target.value
                                updateInventories(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="inventoryFormGroup">
                    <label htmlFor="gearType">Type of gear:  </label>
                    <select value={newInventory?.location?.id} onChange={
                        (evt) => {
                            const copy = { ...newInventory }
                            copy.location = parseInt(evt.target.value)
                            updateInventories(copy)
                        }
                    }><option>Choose Location</option>
                        {userInventory.map(inventory => (
                            <option value={inventory?.gearType?.gearType}>
                                {inventory?.location?.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="inventoryFormGroup">
                    <label htmlFor="startDate">Start date:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={newInventory.startDate}
                        onChange={
                            (evt) => {
                                const copy = { ...newInventory }
                                copy.startDate = evt.target.value
                                updateInventories(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="inventoryFormGroup">
                    <label htmlFor="payRate">Hourly rate:</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter pay rate"
                        value={newInventory.payRate}
                        onChange={
                            (evt) => {
                                const copy = { ...newInventory }
                                copy.payRate = parseInt(evt.target.value)
                                updateInventories(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => (clickEvent)}
                className="myButton">
                Add New Hire
            </button>
        </form>
    )
}