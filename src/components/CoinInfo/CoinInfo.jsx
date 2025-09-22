import Alert from "../Alert/Alert";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

function CoinInfo({ historicData, setDays, days, setCoinInterval, currency }) {
  const chartDays = [
    {
      label: "24 Hours",
      value: 1,
    },
    {
      label: "7 Days",
      value: 7,
    },
    {
      label: "30 days",
      value: 30,
    },
    {
      label: "90 Days",
      value: 90,
    },
    {
      label: "365 days",
      value: 365,
    },
  ];

  function handleDayChange(e){
    // console.log(e.target.options[e.target.selectedIndex].value);
    console.log(Number(e.target.value));
    
    const daysSelected = Number(e.target.value);
    if(daysSelected < 1){
        daysSelected = 1;
    }
    if(daysSelected > 365){
        daysSelected = 365;
    }
    setDays(daysSelected);
    setCoinInterval(daysSelected === 1 ? "" : "daily");
    
  }

  Chart.register(CategoryScale);

  if (!historicData) {
    return <Alert message="No data avilable" type="info" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-6 p-6 w-full ">
      
         <div className="h-[500px] w-full ">
            <Line
             
        data={{
          labels: historicData.prices.map((coinPrice) => {
            let date = new Date(coinPrice[0]); // converting unix timestamp to date
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours() - 12}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),
          datasets: [
            {
              label: `Price (Past ${days} ${
                days === 1 ? `Day` : `Days`
              } Days) in ${currency.toUpperCase()} `,
              data: historicData.prices.map((coinPrice) => coinPrice[1]),
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            point: {
              radius: 0,
            },
          },
        }}
      />

         </div>


      <div className="flex justify-center mt-5 w-full bg-transparent ">
        <select className="select select-ghost mx-w-xs" value={days} onChange={handleDayChange} >
                    {chartDays.map((day, index) => {
                        return(
                            <option  key={index} value={day.value} >{day.label}</option>
                        )
                    })}
          
        </select>
      </div>
    </div>
  );
}

export default CoinInfo;
