import { useState } from "react"
import Modal from 'react-modal';
import { FarmersContext } from "../contexts/farmerContexts";

const EditCow = ({cow, isOpen, closeModal, saveChanges, famers})=>{
    const [editCow, setEditCow] = useState({...cow});
    
    
    const handleInputChange = e =>{
        const name = e.target.name;
        const value = e.target.value;
        setEditCow(prevState =>({...prevState, [name]:value}))
    }

    const handleSaveChanges = () =>{
        saveChanges(editCow);
        closeModal();
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal}>
            <div className="modal">
                <div className="modal-content">
                    
                    <form>
                        <label>Name:</label>
                        <input type="text" name="name" value={editCow.name} onChange={handleInputChange}/><br></br>
                        <label>Type:</label>
                        <input type="text" name="type" value={editCow.type} onChange={handleInputChange}/><br></br>
                        <label>Color:</label>
                        <input type="text" name="color" value={editCow.color} onChange={handleInputChange}/><br></br>
                        <label>Weight:</label>
                        <input type="text" name="weight" value={editCow.weight} onChange={handleInputChange}/><br></br>
                        <label>Owner:</label>
                        <select name="FarmerId" value={editCow.FarmerId} onChange={handleInputChange}>
                            {
                                famers.map(farmer => (
                                    <option key={farmer.id} value={farmer.id}>
                                        {farmer.id}
                                    </option>
                                ))
                            }
                        </select><br/>
                        <button type="submit" onClick={handleSaveChanges}>Save</button><br></br>
                        <button type="cancel" onClick={closeModal}>Cancel</button>
                    </form>
                </div>
            </div>
        </Modal>
    )


}
export default EditCow;