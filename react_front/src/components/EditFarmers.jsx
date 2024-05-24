import { useState } from "react"
import Modal from 'react-modal';

const EditFarmers = ({cow: farmer, isOpen, closeModal, saveChanges})=>{
    const [editFarmer, setEditFarmer] = useState({...farmer});
    const handleInputChange = e =>{
        const name = e.target.name;
        const value = e.target.value;
        setEditFarmer(prevState =>({...prevState, [name]:value}))
    }

    const handleSaveChanges = () =>{
        saveChanges(editFarmer);
        closeModal();
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal}>
            <div className="modal">
                <div className="modal-content">
                    
                    <form>
                        <label>Name:</label>
                        <input type="text" name="name" value={editFarmer.name} onChange={handleInputChange}/><br></br>
                        <label>Owned Land:</label>
                        <input type="text" name="owned_land" value={editFarmer.owned_land} onChange={handleInputChange}/><br></br>
                        <label>Feeding Type:</label>
                        <input type="text" name="feeding_type" value={editFarmer.feeding_type} onChange={handleInputChange}/><br></br>
                        <label>Description:</label>
                        <input type="text" name="description" value={editFarmer.description} onChange={handleInputChange}/><br></br>
                        <button type="submit" onClick={handleSaveChanges}>Save</button><br></br>
                        <button type="cancel" onClick={closeModal}>Cancel</button>
                    </form>
                </div>
            </div>
        </Modal>
    )


}
export default EditFarmers;