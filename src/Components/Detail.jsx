import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeatailHeader from "./Detail/DeatailHeader";
import DetailChanges from "./Detail/DetailChanges";
import DetailMoreData from "./Detail/DetailMoreData";

function Detail() {
  const [tokenData, setTokenData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const token = await JSON.parse(sessionStorage.getItem("token"));
      setTokenData(token);
     
    };

    getData();
  }, []);

  return (
    <div className="text-white pt-4 flex flex-col">
      <div
        className="rounded-full w-32 text-center bottom-3 ml-4 p-3 py-1 text-gray-600 border border-gray-600 shadow-md fixed shadow-gray-800"
        onClick={() => navigate("/")}
      >
        Back to list
      </div>

      {tokenData ? (

        <>

        <DeatailHeader coin={tokenData}/>

        <DetailChanges coin={tokenData}/>

        <DetailMoreData coin = {tokenData}/>

        </>

       /*  <section className="min-h-screen flex flex-col pt-4">
          <img
            src={tokenData.image}
            alt="coin_img"
            className="w-24 mx-auto drop-shadow-lg shadow-white/50 animate-spin-once"
          />
          <h1 className="w-full mx-auto mt-2 text-4xl text-center">
            {" "}
            {tokenData.name}
          </h1>

          <div className="w-full mx-auto text-3xl text-center font-bold mt-2">
            USD {tokenData.current_price.toLocaleString("DE-de")}
          </div>

          <div className="font-light mx-auto text-xl">Daily Change: 
                    
            {tokenData.price_change_percentage_24h<0 ? 
            <span className="text-red-500 font-bold"> {tokenData.price_change_percentage_24h.toFixed(2).toLocaleString('de-DE')}%</span>
            : 
            <span className="text-green-700 font-bold"> {tokenData.price_change_percentage_24h.toFixed(2).toLocaleString('de-DE')}%</span>}</div>

<div className="font-light mx-auto">Daily Change: 
                    
                    {tokenData.price_change_percentage_1h_in_currency<0 ? 
                    <span className="text-red-500 font-bold"> {tokenData.price_change_percentage_1h_in_currency.toFixed(2).toLocaleString('de-DE')}%</span>
                    : 
                    <span className="text-green-700 font-bold"> {tokenData.price_change_percentage_1h_in_currency.toFixed(2).toLocaleString('de-DE')}%</span>}</div>
           
          
        </section> */
      ) : null}
    </div>
  );
}

export default Detail;
