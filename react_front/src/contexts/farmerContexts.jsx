import React, {createContext, useState, useContext, useEffect} from "react";
import axios from "axios";
export const FarmersContext = React.createContext();

export const FarmerProvider = ({children}) => {
    const [farmers, setFarmers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const getAll = async () => {
        setLoading(true);
        console.log(1);
        try {
            const response = await axios.get('http://localhost:5000/api/farmer');
            setFarmers(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5000/api/farmer').then(
            response => {
                setFarmers(response.data);
            }
        ).catch(e => console.error(e)).finally(setLoading(false));
        }, []);
    
        

    const get = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/farmer${id}`);
            setFarmers(prevMills => [...prevMills, response.data]);
        } catch (error) {
            console.error(error);
        }
    }

    const create = async (newFarmer) => {
        setLoading(true);
        
        try {
            const response = await axios.post('http://localhost:5000/api/farmer/', {name:newFarmer.name, owned_land:newFarmer.owned_land, feeding_type:newFarmer.feeding_type, description: newFarmer.description});
            console.log(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const update = async (id, updatedFarmer) => {

        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:5000/api/farmer/${id}`, {name:updatedFarmer.name, owned_land:updatedFarmer.owned_land, feeding_type:updatedFarmer.feeding_type, description: updatedFarmer.description});
            if(response.status === 200){
                await getAll();
            }

        }catch (error) {
            console.error(error);
        }finally {
            setLoading(false);
        }
            
    }

    const deleteFarmer = async (id) => {
        console.log(121);
        try {
            const response = await axios.delete(`http://localhost:5000/api/farmer/${id}`);
            if (response.status === 200) {
                setFarmers(prevMills => prevMills.filter(mill => mill.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    }

    const sortCowsByType = () => {
        const sortedCows = [...farmers].sort((a, b) => parseInt(a.type) - parseInt(b.type));
        setFarmers(sortedCows);
    };

    const value = {farmers, get, create, update,  deleteFarmer ,  sortCowsByType, loading};


    return (
        <FarmersContext.Provider value={value}>
        {children}
        </FarmersContext.Provider>
    );
    }

export const useFarmerContext = () => useContext(FarmersContext);