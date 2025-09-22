import { useContext, useEffect, useState } from "react";
import { fetchCoinData } from "../../services/fecthCoinData";
import { useQuery } from '@tanstack/react-query';
import { CurrencyContext } from "../../Context/CurrencyContext";
import currencyStore from '../../state/store'
import { useNavigate } from 'react-router-dom';
import PageLoader from '../../components/PageLoader/PageLoader'

function CoinTable(){
    const navigate = useNavigate(); 
   const [page, setPage] = useState(1);
   const { currency }  = currencyStore() ;

    const { data, isLoading, isError, error } = useQuery({
    queryKey: ["coins", page, currency], // ✅ object syntax
    queryFn: () => fetchCoinData(page, currency), // ✅ function reference
    // retry: 2,
    // retryDelay: 1000,
    // gcTime: 1000 * 60 * 2, // ✅ v5 uses gcTime instead of cacheTime
  });
   
function handleCoinRedirect(id){
 
    navigate(`/details/${id}`);
 
}

   
   if(isError){
    return <div>Error:{error.message} </div>
   }

   if(isLoading){
    return <PageLoader />
   }
   
    
    return(
        // <>
        // Coin Table <button onClick={()=> setPage(page+1)}>Click</button>
        // {page}
        // </>
        <div className=" my-5 flex flex-col items-center justify-center gap-5 w-[80vw] mx-auto ">
            <div className=" w-full bg-yellow-400 text-black flex py-4 px-2 font-semibold items-center justify-around ">
                {/* Header of the table */}
                <div className=" basic-[35%] md:text-3xl text[10px] " >
                    Coin
                </div>
                <div className=" basic-[25%] md:text-3xl text[10px] " >
                    Price
                </div>
                <div className=" basic-[20%] md:text-3xl text[10px] " >
                    24h change
                </div>
                <div className=" basic-[20%] md:text-3xl text[10px] " >
                    Market Cap
                </div>

            </div>

            <div className="flex  flex-col w-[80vw] mx-auto ">
                {isLoading && <div className="flex justify-center items-center">Loading...</div>}
                {
                data && data.data?.map((coin) => {
                    return(
                        <div onClick={()=> handleCoinRedirect(coin.id)} key={coin.id} className="w-full bg-transparent text-white flex py-4 px-2 font-semibold items-center justify-around cursor-pointer " >
                            <div className="flex items-center justify-start gap-3 basis-[35%]">
                                <div className="md:w-[5rem] w-[24px] md:h-[5rem] h-[24px] ">
                                    <img src={coin.image} alt="preview" className="w-full h-full " loading="lazy"  />
                                </div>
                                <div className="flex flex-col">
                                    <div className="md:text-3xl text-[10px]">
                                    {coin.name}
                                </div>
                                <div className="md:text-xl text-[10px]">
                                    {coin.symbol}
                                </div>
                                </div>

                            </div>

                            <div className="basis-[35%] flex flex-col md:text-2xl text-[10px] ">
                            {coin.current_price}

                            </div>

                            <div className="basis-[20%] md:text-2xl text-[10px]">
                              {coin.high_24h}
                            </div>
                             <div className="basis-[20%] md:text-2xl text-[10px]">
                              {coin.market_cap}
                            </div>


                            </div>
                    )
                })

                }

                
            </div>

            <div className=" w-full justify-center  flex gap-4  py-5 ">
                <button disabled={page === 1} onClick={()=> setPage(page-1)} className="btn btn-primary md:btn-wide w-[120px] h-[50px]  text-white md:text-2xl text-sm ">Prev</button>
                <button onClick={()=> setPage(page+1)} className="btn btn-success md:btn-wide w-[120px] h-[50px]  text-white md:text-2xl text-sm ">Next</button>

            </div>

        </div>
    )
}

export default CoinTable;