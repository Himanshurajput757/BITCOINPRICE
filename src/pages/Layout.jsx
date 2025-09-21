import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

function MainLayout(){

    return(
        <>
        <Navbar /> {/* this navbar is the shared ui we want to across pages*/}
        <Outlet /> {/* the actual page which will we rendered along with navbar   */}
        </>
    )

}

export default MainLayout;