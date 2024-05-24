import { useNavigate } from "react-router-dom";
import {useAuthContext} from "../contexts/userContexts";
import { useState } from "react";

export const Login = () =>{
    const {login,logout,register,user} = useAuthContext();
    const navigate = useNavigate()
    const [usernameLog, setUsernameLog] = useState('');
    const [passwordLog, setPasswordLog] = useState('');
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const handleLogin =async () =>{
        if(await login({name:usernameLog, password:passwordLog})){
            navigate('/main');
        };
    }
    const handleRegister = () =>{
        register({name:usernameReg,password:passwordReg});
        
    }

    return (
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 flex flex-col itmes-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8" >
                <h2 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LogIn</h2>
                <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value = {usernameLog} onChange={(e)=> setUsernameLog(e.target.value)}/>
                <br/>
                <input type="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={passwordLog} onChange={(e)=> setPasswordLog(e.target.value)}/>
                <br/>
                <button onClick={handleLogin} class="rounded-xl bg-brand-500 px-5 py-3 text-base font-medium text-navy-700">LogIn</button>
            </div>
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8" >
                <h2 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Register</h2>
                <input type="text" class='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' value = {usernameReg} onChange={(e)=> setUsernameReg(e.target.value)}/>
                <br/>
                <input type="password"  class ="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={passwordReg} onChange={(e)=> setPasswordReg(e.target.value)}/>
                <br/>
                <button onClick={handleRegister} class = 'rounded-xl bg-brand-500 px-5 py-3 text-base font-medium text-navy-700'>Register</button>
            </div>
        </div>
    )
}