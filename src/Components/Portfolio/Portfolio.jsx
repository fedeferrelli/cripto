import React, { useState, useEffect } from "react";
import db from "../../assets/firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import PortfolioChart from "../../assets/Charts/PortfolioChart";
import PortfolioHeader from "./PorfolioHeader";
import DetailChanges from "../Detail/DetailChanges";
import { AiOutlinePlus } from "react-icons/ai";
import AddCoins from "./AddCoin";
import Loading from "../../assets/Loading";

function Portfolio({ data }) {
  const [portfolio, setPortfolio] = useState([]);
  const [portfolioValue, setportfolioValue] = useState();
  const [chartCoin, setChartCoin] = useState([]);
  const [chartWeight, setChartWeight] = useState([]);
  const [portfolioChanges, setPortfolioChanges] = useState([]);
  const [showAddCoin, setShowAddCoin] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  
  const navigate = useNavigate();

  useEffect(() => {
    const downloadPortfolio = async () => {
      
      try {const querySnapshot = await getDocs(collection(db, "coinsPort"));
      console.log('im in')
      setShowLoading(false)

      querySnapshot.forEach((doc) => {
        
        setPortfolio(doc.data().port);
        
       
      });}
      catch{console.log('fede')}
    };
    downloadPortfolio();
    
  }, [showAddCoin]);

  portfolio.map((e) =>
    data.find((coin) => {
      if (coin.id === e.coinId) {
        (e.price = coin.current_price),
          (e.totalValue = e.qty * e.price),
          (e.name = coin.name);
        e.image = coin.image;
        e.price_change_percentage_1h_in_currency =
          coin.current_price /
          (1 + coin.price_change_percentage_1h_in_currency / 100);
        e.price_change_percentage_24h =
          coin.current_price / (1 + coin.price_change_percentage_24h / 100);
        e.price_change_percentage_7d_in_currency =
          coin.current_price /
          (1 + coin.price_change_percentage_7d_in_currency / 100);
        e.price_change_percentage_14d_in_currency =
          coin.current_price /
          (1 + coin.price_change_percentage_14d_in_currency / 100);
        e.price_change_percentage_30d_in_currency =
          coin.current_price /
          (1 + coin.price_change_percentage_30d_in_currency / 100);
        e.price_change_percentage_200d_in_currency =
          coin.current_price /
          (1 + coin.price_change_percentage_200d_in_currency / 100);
        e.price_change_percentage_1y_in_currency =
          coin.current_price /
          (1 + coin.price_change_percentage_1y_in_currency / 100);
      }
    })
  );

  

  useEffect(() => {
    let value = portfolio.reduce((a, b) => a + b.totalValue, 0);

    setportfolioValue(value);
  }, [portfolio]);

  useEffect(() => {
    let objAux = [];
    let valueKeys = [
      "price_change_percentage_24h",
      "price_change_percentage_1h_in_currency",
      "price_change_percentage_7d_in_currency",
      "price_change_percentage_14d_in_currency",
      "price_change_percentage_30d_in_currency",
      "price_change_percentage_200d_in_currency",
      "price_change_percentage_1y_in_currency",
    ];

    valueKeys.map(
      (e) =>
        (objAux[e] =
          (portfolioValue / portfolio.reduce((a, b) => a + b[e] * b.qty, 0) -
            1) *
          100)
    );

    setPortfolioChanges(objAux);
  }, [portfolioValue]);

  useEffect(() => {
    const auxChartCoin = [];
    const auxChartWeight = [];

    portfolio.map((e) => {
      auxChartCoin.push(e.name);
      auxChartWeight.push(
        Number(((e.totalValue / portfolioValue) * 100).toFixed(2))
      );
    });

    setChartCoin(auxChartCoin);
    setChartWeight(auxChartWeight);
  }, [portfolioValue]);


  return (

    
    <div>

{showLoading && (
        <div className="w-full h-screen flex">
          <Loading />
        </div>
      )}

      {/* barra de navegación */}

      <div className="m-auto w-full sticky top-0 py-2 bg-gray-100  z-50">
        <div className="w-11/12 m-auto flex justify-end">
          <div className="text-gray-400 flex pl-4">
            <button className="text-xl m-auto" onClick={() => navigate("/")}>
              Lista
            </button>
          </div>
          <div className="text-gray-400 flex pl-4">
            <button
              className="text-xl m-auto"
              onClick={() => navigate("/favourites")}
            >
              Favoritos
            </button>
          </div>
          <div className="text-gray-600 flex pl-4">
            <button className="text-xl m-auto">Portfolio</button>
          </div>
        </div>
      </div>

      {/* Botón para agregar criptos al portfolio */}

      <div
        className="fixed bottom-2 right-2 w-12 h-12 rounded-full border border-gray-400 bg-gray-400 shadow-md shadow-gray-400 flex overflow-hidden p-2"
        onClick={() => setShowAddCoin(true)}
      >
        <AiOutlinePlus className="m-auto text-gray-700 h-full w-full" />
      </div>

      {showAddCoin && <AddCoins setShowAddCoin={setShowAddCoin} data={data} />}


{/* pantalla */}

      {portfolio.length === 0 && <div className="w-11/12 p-4 m-auto text-xl text-center  my-auto mt-48">Todavía no ingresaste ninguna cripto a tu portfolio. <span className="mt-4 text-2xl block">Hacelo ya!</span></div>}
 
      {typeof portfolioChanges.price_change_percentage_24h !== "undefined" &&
        typeof portfolioValue !== NaN && portfolio.length !== 0 && (
          <PortfolioHeader
            portfolioValue={portfolioValue.toFixed(3)}
            portfolioChange_1d={portfolioChanges.price_change_percentage_24h}
          />
        )}

      <div className="w-11/12 m-auto mt-8">
        <PortfolioChart coins={chartCoin} weights={chartWeight} />
      </div>

      {portfolio.length !== 0 && <DetailChanges coin={portfolioChanges} />}

      {portfolio.map((e) => (
        <div
          key={e.name}
          className="w-11/12 bg-gray-300 m-auto rounded-lg my-3 p-3"
        >
          <div className="flex flex-row items-center gap-2">
            <img
              src={e.image}
              alt="coin_img"
              className="w-8 rounded-full shadow-lg shadow-black/50"
            />
            <h1 className="text-lg">{e.name}</h1>
          </div>

          <div>
            {" "}
            {e.name}: {e.totalValue.toFixed(2).toLocaleString("de-DE")},{" "}
            {((e.totalValue / portfolioValue) * 100)
              .toFixed(2)
              .toLocaleString("de-DE")}
            %
          </div>
        </div>
      ))}
    </div>
  );
}

export default Portfolio;
