import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Banner from "../components/Banner/Banner";
import CoinTable from "../components/CoinTable/CoinTable";

function Home() {
  return (
    <>
      <div className="w-full h-[100%]  bg-neutral text-neutral-content ">
        <Navbar />
        <Banner />
        <CoinTable />
      </div>
    </>
  );
}

export default Home;
