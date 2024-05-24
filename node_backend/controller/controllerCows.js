import {Cow} from '../model/ModelSequalizer.js';

const getAllCows = async (req, res) => {
    try {
        const cows = await Cow.findAll();
        res.json(cows);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getCow = async (req, res) => {
    const id = parseInt(req.params.id);
    const cow = await Cow.findByPk(id);
    if (cow) {
        res.json(cow);
    } else {
        res.status(404).send({mill: cow, message: `Cow with id ${id} not found`});
    }
}

const createCow = async (req, res) => {


    try {

        const id = Math.floor(Math.random() * 1000000);
        const newCow = {id:id, ...req.body}
        console.log(newCow);
        const cow = await Cow.create(newCow);
        res.status(200).json({mill: cow, message: 'Cow created successfully'});
    } catch (error) {
        res.status(400).send({error, message: 'Error creating cow'});
    }
}

const updateCow = async (req, res) => {
    const id = parseInt(req.params.id);
    const updatedCow = req.body;

    try {
        const cow = await Cow.findByPk(id);
        if (!cow) {
            res.status(404).send({mill: cow, message: `Cow with id ${id} not found`});
        } 
        await cow.update(updatedCow);
        res.status(200).send({message:"Cow Updated"});
    } catch (error) {
        res.status(400).send({error, message: 'Error updating Cow'});
    }
}


const deleteCow = async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await Cow.findByPk(id);
    console.log(result);
    try {
        if (!result) {
            res.status(404).send({message: `Cow with id ${id} not found`});
        } 
        await result.destroy();
        res.status(200).send({message:"Cow deleted succesfully"})
    } catch (error) {
        res.status(400).send({error, message: 'Error deleting Cow'});
    }
    
}

export default{
    getAllCows,
    getCow,
    createCow,
    updateCow,
    deleteCow
};