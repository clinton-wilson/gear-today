import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const InventoryForm = () => {
    const navigate = useNavigate()
    const localGearUser = localStorage.getItem("gear_user")
    const gearUserObject = JSON.parse(localGearUser)
    const [userInventories, setUserInventories] = useState([])
    const [newInventory, updateInventories] = useState({
        gearTypeId: 0,
        name: "",
        manufacturer: "",
        description: "",
        photo: ""
    })

    useEffect(
        () => {
            fetch(`http://localhost:8088/gearTypes?_embed=inventorys`)
                .then(res => res.json())
                .then((userInventories) => {
                    setUserInventories(userInventories)
                })
        },
        []
    )

    const saveNewInventoryItem = (event) => {
        event.preventDefault()

        const itemToAPI = {
            userId: gearUserObject.id,
            gearTypeId: newInventory.gearTypeId,
            name: newInventory.name,
            manufacturer: newInventory.manufacturer,
            description: newInventory.description,
            photo: newInventory.photo
        }

        return fetch(`http://localhost:8088/inventorys`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(itemToAPI)
        })
        .then(res => res.json())
        .then(() => {
            navigate("/inventory")
        })
    }

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
                    <label htmlFor="manufacturer">Manufacturer:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Manufacturer name"
                        value={newInventory.manufacturer}
                        onChange={
                            (evt) => {
                                const copy = { ...newInventory }
                                copy.manufacturer = evt.target.value
                                updateInventories(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="inventoryFormGroup">
                    <label htmlFor="gearType">Type of gear:  </label>
                    <select value={newInventory.gearTypeId} onChange={
                        (evt) => {
                            const copy = { ...newInventory }
                            copy.gearTypeId = parseInt(evt.target.value)
                            updateInventories(copy)
                        }
                    }><option>Choose Gear Type</option>
                        {userInventories.map(gearType => (
                            <option value={gearType.id}>
                                {gearType.gearType}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="inventoryFormGroup">
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Describe this piece of gear"
                        value={newInventory.description}
                        onChange={
                            (evt) => {
                                const copy = { ...newInventory }
                                copy.description = evt.target.value
                                updateInventories(copy)
                            }
                        }
                    />
                </div>
            </fieldset>            <fieldset>
                <div className="inventoryFormGroup">
                    <label htmlFor="photo">Photo:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Add photo"
                        value={newInventory.photo}
                        onChange={
                            (evt) => {
                                const copy = { ...newInventory }
                                copy.photo = evt.target.value
                                updateInventories(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => saveNewInventoryItem(clickEvent)}
                className="myButton">
                Add Inventory Item
            </button>
        </form>
    )
}