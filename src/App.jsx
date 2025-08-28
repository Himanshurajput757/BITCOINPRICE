import { useContext, useState } from "react";import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import { CurrencyContext } from "./Context/CurrencyContext";

function App() {
  
const [currency, setCurrency] = useState('usd');


  return (

    <CurrencyContext.Provider value={{currency, setCurrency}} >
       <Home /> 
    </CurrencyContext.Provider>

       
  );
}

export default App;
