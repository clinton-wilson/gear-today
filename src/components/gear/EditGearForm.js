import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const GearEditForm = () => {
    const navigate = useNavigate()
    const localGearUser = localStorage.getItem("gear_user")
    const gearUserObject = JSON.parse(localGearUser)
    const { inventoryId } = useParams()
    const [gearTypes, setGearTypes] = useState([])
    const [newInventory, updateInventories] = useState({
        userId: gearUserObject.id,
        gearTypeId: 0,
        name: "",
        manufacturer: "",
        description: "",
        photo: "",
        lentOut: ""
    })

    useEffect(
        () => {
            fetch(`http://localhost:8088/inventorys/?id=${inventoryId}`)
                .then(res => res.json())
                .then((data) => {
                    const userObjectInventory = data[0]
                    updateInventories(userObjectInventory)
                })
        },
        []
    )


    useEffect(
        () => {
            fetch(`http://localhost:8088/gearTypes`)
                .then(res => res.json())
                .then((typeData) => {
                    setGearTypes(typeData)
                })
        },
        []
    )
    const editInventoryItem = (event) => {
        event.preventDefault()


        return fetch(`http://localhost:8088/inventorys/${inventoryId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newInventory)
        })
            .then(res => res.json())
            .then(() => {
                navigate(`/inventoryDetails/${inventoryId}`)
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
                    }>
                        <option>Choose Gear Type</option>
                        {gearTypes.map(gearType => (
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
                onClick={(clickEvent) => editInventoryItem(clickEvent)}
                className="myButton">
                Save
            </button>
        </form>
    )
}