import { useContext, useState } from "react";import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import Routing from "./components/Routing/Routing";
// import { CurrencyContext } from "./Context/CurrencyContext";

function App() {
  
// const [currency, setCurrency] = useState('usd');


  return (

    // <CurrencyContext.Provider value={{currency, setCurrency}} >
       <Routing /> 
    // </CurrencyContext.Provider>

       
  );
}

export default App;
