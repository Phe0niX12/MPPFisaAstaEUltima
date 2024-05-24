import React, {createContext, useState, useContext, useEffect} from "react";
import axios from "axios";
export const CowsContext = createContext();

export const CowProvider = ({children}) => {
    const [cows, setCows] = useState([]);
    const [loading, setLoading] = useState(true);
    const api = axios.create({baseURL: 'http://localhost:5000/api'});
    const getAll = async () => {
        setLoading(true);
        try {
            const response = await api.get('http://localhost:5000/api/cow');
            setCows(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        setLoading(true);
        api.interceptors.request.use((config)=>{
            const token = localStorage.getItem('token');
            if(token){
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
        )
        api.get('http://localhost:5000/api/cow').then(
            response => {
                setCows(response.data);
            }
        ).catch(e => console.error(e)).finally(setLoading(false));
        }, []);
    
        

    const getCow = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/cow${id}`);
            setCows(prevMills => [...prevMills, response.data]);
        } catch (error) {
            console.error(error);
        }
    }

    const createCow = async (newCow) => {
        console.log(newCow);
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/cow', {name:newCow.name, type:newCow.type, color:newCow.color, weight:newCow.weight});
            if(response){
                await getAll();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const updateCow = async (id, updatedMill) => {
        console.log(updatedMill);
        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:5000/api/cow/${id}`, updatedMill);
            if(response.status === 200){
                await getAll();
            }

        }catch (error) {
            console.error(error);
        }finally {
            setLoading(false);
        }
            
    }

    const deleteCow = async (id) => {
        console.log(121);
        try {
            const response = await axios.delete(`http://localhost:5000/api/cow/${id}`);
            if (response.status === 200) {
                setCows(prevMills => prevMills.filter(mill => mill.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    }

    const sortCowsByType = () => {
        const sortedCows = [...cows].sort((a, b) => parseInt(a.type) - parseInt(b.type));
        setCows(sortedCows);
    };

    const value = { cows,  getCow, createCow, updateCow,  deleteCow,  sortCowsByType, loading};


    return (
        <CowsContext.Provider value={value}>
        {children}
        </CowsContext.Provider>
    );
    }

export const useCowContext = () => useContext(CowsContext);