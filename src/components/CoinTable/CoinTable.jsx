import { useContext, useEffect, useState } from "react";
import { fetchCoinData } from "../../services/fecthCoinData";
import { useQuery } from 'react-query';
import { CurrencyContext } from "../../Context/CurrencyContext";

function CoinTable(){
   const [page, setPage] = useState(1);
   const { currency }  = useContext(CurrencyContext);

    const { data, isLoading, isError, error }   = useQuery(['coins', page, currency],() => fetchCoinData(page, currency), {
    // retry: 2,
    // retryDelay: 1000,
    //cacheTime: 1000 * 60 * 2,
   });
   


   
   if(isError){
    return <div>Error:{error.message} </div>
   }
   
    
    return(
        // <>
        // Coin Table <button onClick={()=> setPage(page+1)}>Click</button>
        // {page}
        // </>
        <div className=" my-5 flex flex-col items-center justify-center gap-5 w-[80vw] mx-auto ">
            <div className=" w-full bg-yellow-400 text-black flex py-4 px-2 font-semibold items-center justify-around ">
                {/* Header of the table */}
                <div className=" basic-[35%] " >
                    Coin
                </div>
                <div className=" basic-[25%] " >
                    Price
                </div>
                <div className=" basic-[20%] " >
                    24h change
                </div>
                <div className=" basic-[20%] " >
                    Market Cap
                </div>

            </div>

            <div className="flex flex-col w-[80vw] mx-auto ">
                {isLoading && <div className="flex justify-center items-center">Loading...</div>}
                {
                data && data.data?.map((coin) => {
                    return(
                        <div key={coin.id} className="w-full bg-transparent text-white flex py-4 px-2 font-semibold items-center justify-between " >
                            <div className="flex items-center justify-start gap-3 basis-[35%]">
                                <div className="w-[5rem] h-[5rem] ">
                                    <img src={coin.image} alt="preview" className="w-full h-full"  />
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-3xl">
                                    {coin.name}
                                </div>
                                <div>
                                    {coin.symbol}
                                </div>
                                </div>

                            </div>

                            <div className="basis-[35%] flex flex-col ">
                            {coin.price_change_24h}

                            </div>

                            <div className="basis-[20%]">
                              {coin.high_24h}
                            </div>
                             <div className="basis-[20%]">
                              {coin.market_cap}
                            </div>


                            </div>
                    )
                })

                }

                
            </div>

            <div className="flex gap-4 jusity-center items-center py-5 ">
                <button disabled={page === 1} onClick={()=> setPage(page-1)} className="btn btn-primary btn-wide text-white text-2xl ">Prev</button>
                <button onClick={()=> setPage(page+1)} className="btn btn-success btn-wide text-white text-2xl ">Next</button>

            </div>

        </div>
    )
}

export default CoinTable;