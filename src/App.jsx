
import {HashRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ShowCoins from "./Components/ShowCoins";
import Detail from "./Components/Detail";
import Favourites from "./Components/Favourites";
import Portfolio from "./Components/Portfolio/Portfolio";
import Operations from "./assets/Operations";

const baseURL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        await fetch(baseURL)
          .then((response) => response.json())
          .then((data) => setData(data));
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  if (!data) return null;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-[900px] m-auto" >
      <Router>
        <Routes>

          
          <Route path="/" exact element={<ShowCoins data={data} />} />
          <Route path="/favourites" exact element={<Favourites />} /> 
          <Route path="/detailedCoin" exact element={<Detail />} />
          <Route path="/portfolio" exact element={<Portfolio data={data}/>} />
          <Route path="/operations" exact element={<Operations/>}/>
          
        </Routes>
      </Router>
    </div>
    </div>
  );
}

export default App;
