import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeatailHeader from "./Detail/DeatailHeader";
import DetailChanges from "./Detail/DetailChanges";
import DetailMoreData from "./Detail/DetailMoreData";
import {AiOutlineArrowLeft} from 'react-icons/ai';
import Chart from "../assets/Charts/Chart";


function Detail() {
  const [tokenData, setTokenData] = useState();
  const [historicalDate, setHistoricalDate] = useState([])
  const [historicalPrice, setHistoricalPrice] = useState([])
  const [daysToShowBigScreens, setDaysToShowBigScreens] = useState(7)

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const token = await JSON.parse(sessionStorage.getItem("token"));
      setTokenData(token);
     
    };

    getData();
  }, []);

  //https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1%2C14%2C30%2Cmax


  useEffect(() => {
    let historicalData = []
    let historicalDate=[]
    let historicalPrice=[]

    const getData = async () => {
      try {
        await fetch(`https://api.coingecko.com/api/v3/coins/${tokenData.id}/market_chart?vs_currency=usd&days=365`)
          .then((response) => response.json())
          .then((data) => historicalData=data.prices);

          historicalData.map(e=>(
            historicalDate.push(manipulateDates(e[0])),
            historicalPrice.push(e[1])
          ))
          
       setHistoricalDate(historicalDate);
       setHistoricalPrice(historicalPrice)
          
      } catch (err) {
        console.log(err);
      }
    };

    { typeof(tokenData) !== 'undefined' && getData()};
  }, [tokenData]);

  const manipulateDates = (date) =>{

    const dateAux = new Date(date);

    return `${dateAux.getDate()} - ${dateAux.getMonth()+1}`
  }

 

  return (
    <div className="text-gray-600 pt-4 flex flex-col">
      <div
        className="rounded-full w-auto text-center bottom-3 ml-4 px-5 py-2 flex gap-2 text-gray-600 border border-gray-400 shadow-md fixed shadow-gray-400 bg-gray-100 sm:cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <AiOutlineArrowLeft className="text-gray-400 text-lg m-auto"/>
        <span className="">Volver</span>
      </div>

      {tokenData ? (

        <>

        <section className='sm:flex sm:flex-col'>

        <div className=" m-auto mt-0 px-4" >  
      

        <DeatailHeader  coin={tokenData}/>
      
        </div>

        <div className="m-auto sm:w-full">
        <DetailChanges  coin={tokenData} setDaysToShowBigScreens={setDaysToShowBigScreens}/>

        <DetailMoreData coin = {tokenData}/>
        </div>
        </section>


<div className="hidden sm:flex  m-auto mt-10 w-full max-w-[700px] bg-gray-200 p-4 rounded-lg mb-20">
<Chart historicalDate={historicalDate.slice(365-daysToShowBigScreens)} historicalPrice = {historicalPrice.slice(365-daysToShowBigScreens)} coin={tokenData.name} period={`${daysToShowBigScreens} días`}/>

</div>



<div className="w-11/12 m-auto my-10 overflow-auto whitespace-nowrap
                sm:hidden">

    
<Chart historicalDate={historicalDate.slice(359)} historicalPrice = {historicalPrice.slice(359)} coin={tokenData.name} period={'7 días'}/>

<Chart className="bg-green-500 sm:w-1/2" historicalDate={historicalDate.slice(352)} historicalPrice = {historicalPrice.slice(352)} coin={tokenData.name} period={'14 días'}/>

<Chart historicalDate={historicalDate.slice(336)} historicalPrice = {historicalPrice.slice(336)} coin={tokenData.name} period={'30 días'}/>

<Chart historicalDate={historicalDate.slice(306)} historicalPrice = {historicalPrice.slice(306)} coin={tokenData.name} period={'60 días'}/>

<Chart historicalDate={historicalDate.slice(276)} historicalPrice = {historicalPrice.slice(276)} coin={tokenData.name} period={'90 días'}/>

<Chart historicalDate={historicalDate.slice(186)} historicalPrice = {historicalPrice.slice(186)} coin={tokenData.name} period={'180 días'}/>

<Chart historicalDate={historicalDate} historicalPrice = {historicalPrice} coin={tokenData.name} period={'365 días'}/>


</div>
</>
      ) : null}



     

         </div>
  );
}

export default Detail;
