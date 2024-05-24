import Farmer from '../model/ModelSequalizer.js';

const getAllFarmers = async (req, res) => {
    try {
        const cows = await Farmer.getAll();
        res.json(cows);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getFarmer = async (req, res) => {
    const id = parseInt(req.params.id);
    const cow = await Farmer.get(id);
    if (cow) {
        res.json(cow);
    } else {
        res.status(404).send({mill: cow, message: `Farmer with id ${id} not found`});
    }
}

const createFarmer = async (req, res) => {
    const newCow = req.body;
    console.log(newCow);
    try {
        const cow = await Farmer.create(newCow);
        
        res.status(200).json({mill: cow, message: 'Farmer created successfully'});
    } catch (error) {
        res.status(400).send({error, message: 'Error creating Farmer'});
    }
}

const updateFarmer = async (req, res) => {
    const id = parseInt(req.params.id);
    const updatedCow = req.body;

    try {
        const cow = await Farmer.update(id, updatedCow);
        if (cow) {
            res.json({mill: cow, message: 'Farmer updated successfully'});
        } else {
            res.status(404).send({mill: cow, message: `Farmer with id ${id} not found`});
        }
    } catch (error) {
        res.status(400).send({error, message: 'Error updating farmer'});
    }
}


const deleteFarmer = async (req, res) => {
    const id = parseInt(req.params.id);
    
    try {
        
        const result = await Farmer.deleteFarmer(id);
        
        if (result) {
            res.status(200).send({message: 'Farmer deleted successfully'});
        } else {
            res.status(404).send({message: `Farmer with id ${id} not found`});
        }
    } catch (error) {
        res.status(400).send({error, message: 'Error deleting farmer'});
    }
    
}

export default {
    getAllFarmers,
    getFarmer,
    createFarmer,
    updateFarmer,
    deleteFarmer
};