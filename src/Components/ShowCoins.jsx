import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../assets/Loading";
import { Fade } from "react-awesome-reveal";
import { AiFillHeart, AiOutlineHeart, AiOutlineLoading } from "react-icons/ai";

import db from "../assets/firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import {AiOutlineArrowRight} from 'react-icons/ai';

function ShowCoins({ data }) {
  const [favourites, setFavourites] = useState([]);
  const [favouritesLoading, setFavouritesLoading] = useState(undefined);
  const [checkFavourites, setCheckFavourites] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [showLoading, setShowLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const downloadFavourites = async () => {
      const querySnapshot = await getDocs(collection(db, "coins"));
      querySnapshot.forEach((doc) => {
        setFavourites(doc.data().favs);
        setFavouritesLoading(undefined);
      });
    };
    downloadFavourites();
  }, [checkFavourites]);

  const uploadFavourites = async (arrFav) => {
    await setDoc(doc(db, "coins", "favourites"), {
      favs: arrFav,
    });

    setCheckFavourites(!checkFavourites);
  };

  const addFavToUpload = (n) => {
    setFavouritesLoading(n);
    let newFavs = [...favourites, n];
    uploadFavourites(newFavs);
  };

  const deleteFavToUpload = (n) => {
    setFavouritesLoading(n);
    let newFavs = [...favourites.filter((i) => i != n)];
    uploadFavourites(newFavs);
  };

  const setCoinToBeDetailed = (coin) => {
    sessionStorage.setItem("token", JSON.stringify(coin));
    navigate("/detailedCoin");
  };

  {
    data &&
      useEffect(() => {
        const getFilteredData = () => {
          const filterAux = data.filter(
            (e) =>
              e.name.toLowerCase().includes(filter.toLowerCase()) ||
              e.symbol.toLowerCase().includes(filter.toLowerCase()) ||
              e.id.toLowerCase().includes(filter.toLowerCase())
          );
          setFilteredData(filterAux);
          setShowLoading(false);
        };

        getFilteredData();
      }, [filter]);
  }

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
          <div className="text-gray-600 flex pl-4">
            <button className="text-xl m-auto">Lista</button>
          </div>
          <div className="text-gray-400 flex pl-4">
            <button
              className="text-xl m-auto"
              onClick={() => navigate("/favourites")}
            >
              Favoritos
            </button>
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
        <div className="w-full h-screen flex">
          <Loading />
        </div>
      )}

      <div className="w-full flex flex-wrap">

      {filteredData.map((e, index) => (
        <div
          key={index}
          className="border w-11/12 sm:w-60 bg-gray-200 border-gray-400/50 rounded-lg shadow-md  shadow-gray-500/50 px-3 py-4 my-2 m-auto text-gray-700 relative 
          sm:mt-10 
          "
        >
          <section className="flex flex-row py-1 justify-left items-center w-full ">
            <img
              src={e.image}
              alt="coin_img"
              className="w-10 rounded-full shadow-lg shadow-black/50
              sm:absolute sm:-top-5 sm:left-[100px] sm:bg-gray-200 sm:border sm:border-gray-400/50"
            />

            <div
              className="w-full flex flex-row justify-between 
              sm:flex-col sm:flex-center sm:items-center sm:mt-3 relative"
              
            >
              <div className="w-full top-0 bottom-0 absolute sm:hidden" onClick={() => setCoinToBeDetailed(e)}>

              </div>
              <div className="font-semibold ml-3 w-1/2 
              sm:text-center sm:w-full sm:mx-0">
                <h1 className="text-gray-700 font-semibold">
                  {e.market_cap_rank}. <span className="text-xl">{e.name}</span>
                </h1>

                <div className="font-light sm:mt-2">
                  Daily:
                  {e.price_change_percentage_24h < 0 ? (
                    <span className="text-red-500 font-normal">
                      {" "}
                      {e.price_change_percentage_24h
                        .toFixed(2)
                        .toLocaleString("de-DE")}
                      %
                    </span>
                  ) : (
                    <span className="text-green-700 font-normal">
                      {" "}
                      {e.price_change_percentage_24h
                        .toFixed(2)
                        .toLocaleString("de-DE")}
                      %
                    </span>
                  )}
                </div>
              </div>

              <div className="mr-0 justify-end items-end flex text-lg font-semibold w-1/2 max-w-1/2 
              sm:w-full sm:mr-auto sm:justify-center">
                USD {e.current_price.toLocaleString("es-AR")}
              </div>

              <div className="hidden sm:flex  w-full mt-3">
                <div className="rounded-full cursor-pointer flex justify-center items-center py-1 text-sm px-3 m-auto border border-gray-400/50 hover:shadow-md duration-300 ease-in-out" onClick={() => setCoinToBeDetailed(e)}>
                  <span className="mr-1">Detalle </span> <AiOutlineArrowRight/>
                </div>
              </div>

            </div>
            
          </section>
          <div className="right-1 top-1 absolute z-20">
            {favouritesLoading === e.id ? (
              <Fade duration="500">
                <AiOutlineLoading className="text-2xl text-gray-500/50 animate-spin" />
              </Fade>
            ) : favourites.includes(e.id) ? (
              <Fade duration="500">
                <AiFillHeart
                  className="text-2xl text-red-500/50 animate-spin-once cursor-pointer"
                  onClick={() => deleteFavToUpload(e.id)}
                />
              </Fade>
            ) : (
              <Fade duration="500">
                <AiOutlineHeart
                  className="text-2xl text-gray-500 cursor-pointer sm:hover:animate-spin-once  sm:hover:text-red-500/50 duration-300 ease-in-out"
                  onClick={() => addFavToUpload(e.id)}
                />
              </Fade>
            )}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default ShowCoins;
