import React, { useState, useEffect } from "react";
import db from "../assets/firebase";
import { collection, getDocs } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import Loading from "../assets/Loading";

import ShowList from "../assets/ShowList";

function Favourites() {
  const [dataFavourites, setDataFavourites] = useState();
  const [favourites, setFavourites] = useState(["nothing-to-show"]);
  const [checkFavouritesFavScreen, setCheckFavouritesFavScreen] =
    useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [favouritesLoading, setFavouritesLoading] = useState(undefined);
  const navigate = useNavigate();

  const baseURL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y";

  useEffect(() => {
    const downloadFavourites = async () => {
      const querySnapshot = await getDocs(collection(db, "coins"));
      querySnapshot.forEach((doc) => {
        setFavourites(doc.data().favs);
        setFavouritesLoading(undefined);
      });
      setShowLoading(false);
    };
    downloadFavourites();
  }, [checkFavouritesFavScreen]);

  useEffect(() => {
    const getData = async () => {
      try {
        await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${favourites.join(
            "%2C"
          )}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y`
        )
          .then((response) => response.json())
          .then((data) =>
            setDataFavourites(
              data.filter(
                (e) =>
                  e.name.toLowerCase().includes(filter.toLowerCase()) ||
                  e.symbol.toLowerCase().includes(filter.toLowerCase()) ||
                  e.id.toLowerCase().includes(filter.toLowerCase())
              )
            )
          );
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [favourites, filter]);

  if (!dataFavourites) return null;
  if (favourites.length === 0)
    return (
      <div className="text-gray-400 w-full absolute top-0 bottom-0 flex flex-col">
        <div className="flex flex-col justify-center m-auto gap-8">
          <div className="m-auto w-11/12 text-2xl text-center">
            Todavía no agregaste ninguna moneda a favoritos
          </div>

          <div className="text-gray-600 flex pl-4">
            <button className="text-xl m-auto" onClick={() => navigate("/")}>
              Volver a la lista
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="m-auto flex flex-col sm:flex-row sm:flex-wrap  gap-1 sm:gap-2">
      <div className="m-auto w-full top-0 py-2 bg-gray-100 sticky shadow-md shadow-gray-200 z-50">
        <div className="w-11/12 m-auto flex">
          <input
            type="text"
            placeholder="Buscar"
            className="italic  px-3 py-2 bg-gray-200 border border-gray-300 rounded-lg shadow-sm   m-auto text-gray-400 outline-none w-20 focus:w-full focus:shadow-gray-500 ease-in-out duration-700 ml-0"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          ></input>
          <div className="text-gray-400 flex pl-4">
            <button className="text-xl m-auto" onClick={() => navigate("/")}>
              Lista
            </button>
          </div>
          <div className="text-gray-600 flex pl-4">
            <button className="text-xl m-auto">Favoritos</button>
          </div>
          <div className="text-gray-400 flex pl-4">
            <button
              className="text-xl m-auto"
              onClick={() => navigate("/portfolio")}
            >
              Portfolio
            </button>
          </div>
        </div>
      </div>

      {showLoading && (
        <div className="w-full">
          <Loading />
        </div>
      )}

      <ShowList
        data={dataFavourites}
        checkFavouritesFavScreen={checkFavouritesFavScreen}
        setCheckFavouritesFavScreen={setCheckFavouritesFavScreen}
      />
    </div>
  );
}

export default Favourites;
