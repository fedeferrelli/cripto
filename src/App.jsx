import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ShowCoins from "./Components/ShowCoins";
import Detail from "./Components/Detail";

const baseURL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10000&page=1&sparkline=false";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setData(response.data);
    });
  }, []);

  if (!data) return null;
 
  return (
    <div className="bg-black min-h-screen">
      <Router>
        <Routes>
          <Route path="/" exact element={<ShowCoins data={data} />} />
          <Route path="/detailedCoin" exact element={<Detail/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
