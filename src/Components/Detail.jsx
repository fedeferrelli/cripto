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

    getData();
  }, [tokenData]);

  const manipulateDates = (date) =>{

    const dateAux = new Date(date);

    return `${dateAux.getDate()} - ${dateAux.getMonth()+1}`
  }

  console.log(historicalDate)

  return (
    <div className="text-gray-600 pt-4 flex flex-col">
      <div
        className="rounded-full w-auto text-center bottom-3 ml-4 px-5 py-2 flex gap-2 text-gray-600 border border-gray-600 shadow-md fixed shadow-gray-600 bg-gray-100"
        onClick={() => navigate(-1)}
      >
        <AiOutlineArrowLeft className="text-gray-400 text-lg m-auto"/>
        <span className="">Volver</span>
      </div>

      {tokenData ? (

        <>

        <section>

        <DeatailHeader coin={tokenData}/>

        <DetailChanges coin={tokenData}/>

        <DetailMoreData coin = {tokenData}/>
        </section>


<div className="w-11/12 m-auto my-10 overflow-auto whitespace-nowrap">

    
<Chart historicalDate={historicalDate.slice(358)} historicalPrice = {historicalPrice.slice(358)} coin={tokenData.name} period={'7 días'}/>

<Chart historicalDate={historicalDate.slice(351)} historicalPrice = {historicalPrice.slice(351)} coin={tokenData.name} period={'14 días'}/>

<Chart historicalDate={historicalDate.slice(335)} historicalPrice = {historicalPrice.slice(335)} coin={tokenData.name} period={'30 días'}/>

<Chart historicalDate={historicalDate.slice(305)} historicalPrice = {historicalPrice.slice(305)} coin={tokenData.name} period={'60 días'}/>

<Chart historicalDate={historicalDate.slice(275)} historicalPrice = {historicalPrice.slice(275)} coin={tokenData.name} period={'90 días'}/>

<Chart historicalDate={historicalDate.slice(185)} historicalPrice = {historicalPrice.slice(185)} coin={tokenData.name} period={'180 días'}/>

<Chart historicalDate={historicalDate} historicalPrice = {historicalPrice} coin={tokenData.name} period={'365 días'}/>


</div>
</>
      ) : null}



     

         </div>
  );
}

export default Detail;
