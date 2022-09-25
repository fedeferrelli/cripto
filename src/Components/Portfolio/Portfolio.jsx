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
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Fade } from "react-awesome-reveal";

function Portfolio({ data }) {
  const [portfolio, setPortfolio] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState();
  const [chartCoin, setChartCoin] = useState([]);
  const [chartWeight, setChartWeight] = useState([]);
  const [portfolioChanges, setPortfolioChanges] = useState([]);
  const [showAddCoin, setShowAddCoin] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [checkPortfolio, setCheckPortfolio] = useState(true);
  const [showOperations, setShowOperations] = useState(false);
  const [portfolioRaw, setPortfolioRaw] = useState();
  const [showDeleteOption, setShowDeleteOption] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const downloadPortfolio = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "coinsPort"));

        querySnapshot.forEach((doc) => {
          // guarda un portfolio raw para manejar el eliminado

          setPortfolioRaw(doc.data().port);

          // eliminar las coins duplicadas (caso cuando se carga una coin que ya fioguraba en portfolio)

          // array con los ID de las coins del portafolio
          let coins = [...new Set(doc.data().port.map((e) => e.coinId))];

          // array con la info desacargada: cada elemnto del array se corresponde con una coin particular. Si la coin esta duplicada, entonces el elemento es un array de dos elementos

          let arrayCoinsAgregadas = coins.map((e) =>
            doc.data().port.filter((i) => i.coinId === e)
          );

          let arrayCoinUnicasAgregadas = [];

          // se busca que el array con dos elemntos (coin duplicada) se tranforme en un objeto con la suma de las cantidades de las coins. Ese objto se agrega a un array final
          arrayCoinsAgregadas.map((e) =>
            arrayCoinUnicasAgregadas.push({
              coinId: e[0].coinId,
              qty: e.reduce((a, b) => a + Number(b.qty), 0),
              operations: e.map((i) => ({
                date: i.date.seconds,
                qty: i.qty,
                price: i.current_price,
                value: i.value,
              })),
            })
          );

          setPortfolio(arrayCoinUnicasAgregadas);
        });
      } catch (error) {
        console.log(error);
      }
      setShowLoading(false);
    };
    downloadPortfolio();
  }, [showAddCoin, checkPortfolio]);

  portfolio.map((e) =>
    data.find((coin) => {
      if (coin.id === e.coinId) {
        (e.current_price = coin.current_price),
          (e.totalValue = e.qty * e.current_price),
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

    setPortfolioValue(value);
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

  // eliminar coin del portafolio
  const uploadPortfolio = async (arrPortfolio) => {
    setShowLoading(true);

    await setDoc(doc(db, "coinsPort", "portfolio"), {
      port: arrPortfolio,
    });

    setCheckPortfolio(!checkPortfolio);
  };

  const coinToDelete = (toDelete) => {
    setShowLoading(true);

    const newPortfolioToUpload = portfolioRaw.filter(
      (e) => e.coinId !== toDelete
    );
    setShowDeleteOption();
    uploadPortfolio(newPortfolioToUpload);
  };

  const setOperationToBeDetailed = (operations) => {
    sessionStorage.setItem("operations", JSON.stringify(operations));
    navigate("/operations");
  };

  return (
    <div className="pb-16 ">
      {showLoading && (
        <div className="w-full">
          <Loading />
        </div>
      )}

      {/* barra de navegación */}

      <div className="m-auto w-full top-0 py-4 bg-gray-100 sticky shadow-md shadow-gray-200 z-50">
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
        className="fixed z-50  bottom-2 right-2 w-14 h-14 rounded-full border border-gray-400/50 bg-gray-300 shadow-md shadow-gray-400 flex overflow-hidden p-3
        sm:cursor-pointer sm:hover:shadow-gray-600 duration-300 ease-in-out"
        onClick={() => setShowAddCoin(true)}
      >
        <AiOutlinePlus className="m-auto text-gray-700 h-full w-full" />
      </div>

      <div className="bg-yellow-400 m-auto">
        {showAddCoin && (
          <AddCoins setShowAddCoin={setShowAddCoin} data={data} />
        )}
      </div>

      {/* pantalla */}

      {portfolio.length === 0 && (
        <div className="w-11/12 p-4 m-auto text-xl text-center  my-auto mt-48">
          Todavía no ingresaste ninguna cripto a tu portfolio.{" "}
          <span className="mt-4 text-2xl block">Hacelo ya!</span>
        </div>
      )}

      {typeof portfolioChanges.price_change_percentage_24h !== "undefined" &&
        typeof portfolioValue !== NaN &&
        portfolio.length !== 0 && (
          <PortfolioHeader
            portfolioValue={portfolioValue.toFixed(2)}
            portfolioChange_1d={portfolioChanges.price_change_percentage_24h}
          />
        )}

      <div className="flex flex-col sm:flex-row justify-center">
        <div className="w-11/12 m-auto mt-8 sm:w-1/2">
          <PortfolioChart coins={chartCoin} weights={chartWeight} />
        </div>

        <div className="m-auto">
          {portfolio.length !== 0 && <DetailChanges coin={portfolioChanges} />}
        </div>
      </div>

      <div className="sm:flex sm:flex-wrap sm:justify-center ">
        {portfolio
          .sort((a, b) => {
            return b.totalValue - a.totalValue;
          })
          .map((e, index) => (
            <div
              key={index}
              /*           className="w-11/12 bg-gray-300 m-auto rounded-lg my-3 p-3 py-4" */
              className="border w-11/12 sm:w-60 bg-gray-200 border-gray-400/50 rounded-lg shadow-md shadow-gray-500/50 px-3 py-4 my-5 m-auto text-gray-700 relative overflow-hidden "
            >
              {showDeleteOption === e.coinId && (
                <Fade
                  duration="700"
                  direction="down"
                  className="w-full z-10 flex flex-col bg-gray-300 absolute left-0 top-0 bottom-0 right-0 "
                >
                  <div className="m-auto w-full h-full flex flex-col justify-evenly">
                    <div className="w-full text-center m-auto px-2">
                      {" "}
                      ¿Estás seguro que querés eliminar esta operación de{" "}
                      <span className="font-bold">{e.name}</span> por{" "}
                      <span className="font-bold">
                        USD {e.totalValue.toLocaleString("DE-de")}
                      </span>
                      ?{" "}
                    </div>

                    <div className="text-center m-auto flex flex-row w-full text-gray-100 justify-evenly">
                      <button
                        className="w-1/3 rounded-lg m-auto text-center py-1   bg-green-600/95 text-gray-800"
                        onClick={() => coinToDelete(e.coinId)}
                      >
                        {" "}
                        Sí{" "}
                      </button>
                      <button
                        className=" w-1/3 rounded-lg m-auto text-center py-1   bg-red-500/95 text-gray-800"
                        onClick={() => setShowDeleteOption()}
                      >
                        {" "}
                        Cancelar{" "}
                      </button>
                    </div>
                  </div>{" "}
                </Fade>
              )}

              <div className="flex flex-row sm:flex-col items-center gap-2 relative ">
                <img
                  src={e.image}
                  alt="coin_img"
                  className="w-8 sm:w-10  rounded-full shadow-lg shadow-black/50"
                />
                <h1 className="text-lg font-semibold sm:text-center">
                  {e.name}{" "}
                  <span className="sm:block">
                    USD {e.totalValue.toLocaleString("DE-de")}{" "}
                  </span>{" "}
                </h1>

                {/* borrar coin */}

                <div
                  className="w-8  h-8 shadow-lg shadow-black/50   flex rounded-full  bg-gray-100 absolute right-0 sm:top-0 sm:cursor-pointer"
                  onClick={() => setShowDeleteOption(e.coinId)}
                >
                  <AiOutlineDelete className="w-12 m-auto text-lg" />
                </div>
              </div>

              <div className="flex flex-col justify-left pl-10 gap-1 font-light sm:pl-4">
                <span>Cantidad: {e.qty.toLocaleString("de-DE")}</span>
                <span>
                  {" "}
                  Ponderación:{" "}
                  {((e.totalValue / portfolioValue) * 100)
                    .toFixed(2)
                    .toLocaleString("de-DE")}
                  %
                </span>
                <span> Operaciones: {e.operations.length}</span>
              </div>

              <div className="sm:flex  w-auto  mt-3">
                <div
                  className="rounded-full  w-28 sm:w-auto cursor-pointer flex justify-center items-center py-1 text-sm px-3 m-auto border border-gray-400/50 hover:shadow-md duration-300 ease-in-out"
                  onClick={() => setOperationToBeDetailed(e)}
                >
                  <span className="mr-1">Detalle </span> <AiOutlineArrowRight />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Portfolio;
