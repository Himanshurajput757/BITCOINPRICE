import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import { use, useEffect } from "react";
import { fetchCoinDetails } from '../services/fetchCoinDetails'
import  parse from 'html-react-parser';
import currencyStore from '../state/store';
import PageLoader from '../components/PageLoader/PageLoader'
import CoinInfoContainer from "../components/CoinInfoContainer/CoinInfoContainer";

function CoinDetailsPage(){
    const { coinId } = useParams();
     
    const { currency } = currencyStore();
    

    const { isError, isLoading, data: coin } = useQuery({
    queryKey: ["coin", coinId, currency],       // add currency if coin data depends on it
    queryFn: () => fetchCoinDetails(coinId),
    cacheTime: 1000 * 60 * 2,
    staleTime: 1000 * 60 * 2,
  });
   
    if(isLoading){
        return <PageLoader />
    }

    if(isError){
        return <div>Error: Something went wrong</div>
    }

    
return(
   <div className="flex flex-col md:flex-row text-white bg-gray-900 ">
    <div className="w-full md:w-1/3 flex flex-col items-center mt-6 md:mt-0 border-r-2 border-gray-500">
        <img src={coin?.data?.image?.large} alt={coin?.data?.name} className="h-52 mb-5" />
        <h1 className="text-4xl font-bold mb-5">
          {coin?.data?.name}
        </h1>

        <p className="w-full px-6 py-4 text-justify">
           {parse(coin?.data?.description?.en)}
        </p>

        <div className="w-full flex flex-col lg:flex-row md:justify-around items-center px-6 py-4 ">
            <div className="flex items-center mb-4 md:mb-0 ">
                <h2 className="text-xl font-bold ">
                  Rank
                </h2>
                <span className="ml-3 text-xl  ">
                    {coin?.data?.market_cap_rank}

                </span>

            </div>

            <div className="flex items-center mb-4 md:mb-0 px-6 py-4 ">
                  <h2 className="text-xl text-yellow-400 font-bold ">
                  Current Price
                </h2>
                <span className="ml-3 text-xl ">
                    {coin?.data?.market_data?.current_price[currency]}

                </span>

            </div>

        </div>
    </div>

    <div className="md:w-2/3 w-full  ">
        <CoinInfoContainer  coinId={coinId} />
    </div>
   </div>
)
}

export default CoinDetailsPage;