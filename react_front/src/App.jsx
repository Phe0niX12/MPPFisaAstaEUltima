import React from "react";
import ReactDOM from "react-dom";
import {
  RouterProvider
} from "react-router-dom";
import { router } from "./router/Router";
import "./index.scss";
import { CowProvider } from "./contexts/cowsContexts";
import { FarmerProvider } from "./contexts/farmerContexts";
import { AuthProvider } from "./contexts/userContexts";

const App = () => {
    return(
      <AuthProvider>
        <FarmerProvider>
          <CowProvider>
            <RouterProvider router={router} />
          </CowProvider>
        </FarmerProvider>
      </AuthProvider>
    )
};
ReactDOM.render(<App />, document.getElementById("app"));