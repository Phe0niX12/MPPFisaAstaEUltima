import {createBrowserRouter} from "react-router-dom";
import MainPage from "../pages/MainPage";
import Details from "../pages/Details"
import { Login } from "../pages/Login";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Login />
    },
    {
        path:"/main",
        element:<MainPage/>
    },
    {
        path:"/cow/:id",
        element: <Details />
    },
    {
        path:"farmer/:id",
        element:<Details/>
    }
])