import axios from "axios";
import React, {useState, useEffect} from "react";
import ShowCoins from "./Components/ShowCoins";

const baseURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10000&page=1&sparkline=false";

function App() {

  const [data, setData] = useState();

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setData(response.data);
    });
  }, []);

  if (!data) return null;
console.log(data)
  return (
    <div className="bg-black">
      <ShowCoins data={data}/>
      
    </div>
  );
}
 

export default App
