import React from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
   // Title,
    Tooltip,
    Filler,
    Legend
  );


  export const options = {
    responsive: true,
    labels: {
        display: false,
        //text: 'Chart.js Line Chart',
      },
    plugins: {
      /* legend: {
        position: 'top',
      }, */
      title: {
        display: false,
        //text: 'Chart.js Line Chart',
      },
      
      scales: {
        y: {
            beginAtZero: true
        }
    }
    },
  };




 //const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

/* export const data = {
    labels:['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      fill: true,
      label: 'Dataset 2',
      data: [8,9,2,6,4,5,7],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}; */


function Chart({historicalDate, historicalPrice, coin, period}) {
    const low = historicalPrice[0]>=historicalPrice[historicalPrice.length-1];
    const varPorcentual = ((historicalPrice[historicalPrice.length-1]/historicalPrice[0]-1)*100).toFixed(2).toLocaleString('de-DE');
  
    return(

        <div className="inline-block w-full mr-12 mb-12 sm:mr-auto">

            <div className="w-full text-center text-lg text-gray-600">
                <span className="text-gray-600 mr-2">{period}</span>
                {/* <span className={low ? 'text-red-400' : 'text-green-600'}  >{varPorcentual}%</span>
                 */}
                </div>
         
        <Line options={options} data={{
            labels:historicalDate,
          datasets: [
            {
              fill: true,
              label: coin,
              data: historicalPrice,
              borderColor: low ? 'rgba(255, 87, 51, 0.7)' : 'rgb(76, 187, 23)',
              backgroundColor: low ? 'rgba(255, 87, 51, 0.5)' : 'rgb(76, 187, 23, 0.5)',
            },
          ],
        }} />

</div>
    
    
        )
}

export default Chart
