import React, {createContext, useState, useContext, useEffect} from "react";
import axios from "axios";
export const AuthContext = createContext();
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const login = async(userData) =>{
        try{
            const repsonse = await axios.post('http://localhost:5000/api/sign-in',userData);
            const token = repsonse.data.accessToken;
            localStorage.setItem('token',token);
            setUser(userData);
            return true;
        }catch(err){
            alert('An error occurred during login. Please try again later.')
            return false;
        }
    }

    const register = async (userData) =>{
        try{
            const response = await axios.post('http://localhost:5000/api/sign-up',userData).then(navigate('/'));
            navigate('/');
        }catch(err){
            console.error(err);
        }
    }

    const logout = () =>{
        localStorage.removeItem('token');
        setUser(null);
    }

    const value = {login,register,logout,user};
    return (
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    );
    }

export const useAuthContext = () => useContext(AuthContext);