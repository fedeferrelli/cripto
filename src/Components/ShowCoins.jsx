import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../assets/Loading";
import {Fade} from 'react-awesome-reveal';
import { AiFillHeart, AiOutlineHeart, AiOutlineLoading } from "react-icons/ai";


import db from "../assets/firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";




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
    <div className="max-w-[900px] m-auto flex flex-col sm:flex-row sm:flex-wrap  gap-1 sm:gap-2">
      <div className="m-auto w-full sticky top-0 py-2 bg-gray-100  z-50">
        <div className="w-11/12 m-auto flex">
        <input
          type="text"
          placeholder="Buscar"
          className="italic  px-3 py-2 bg-gray-200 border border-gray-600 rounded-lg shadow-sm shadow-gray-800  m-auto text-gray-400 outline-none w-20 focus:w-full focus:border-indigo-800 ease-in-out duration-300 ml-0"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        ></input>
         <div className="text-gray-600 flex pl-4"><button className="text-xl m-auto">Lista</button></div>
         <div className="text-gray-400 flex pl-4"><button className="text-xl m-auto" onClick={()=>navigate('/favourites')}>Favoritos</button></div>
         <div className="text-gray-400 flex pl-4"><button className="text-xl m-auto" onClick={()=>navigate('/portfolio')}>Portfolio</button></div>
         </div>
      </div>

      {showLoading && (
        <div className="w-full h-screen flex">
          <Loading />
        </div>
      )}

      {filteredData.map((e, index) => (
        <div
          key={index}
          className="border w-11/12 sm:w-60 bg-gray-200 border-gray-400/50 rounded-lg shadow-md shadow-gray-500/50 px-3 py-4 my-2 m-auto text-gray-700 relative"
        >
          
        
          
        <section className="flex flex-row justify-left items-center w-full ">
            <img
              src={e.image}
              alt="coin_img"
              className="w-10 rounded-full shadow-lg shadow-black/50"
            />

            <div className="w-full flex flex-row justify-between">

            <div
              className="font-semibold ml-3 w-1/2"
              onClick={() => setCoinToBeDetailed(e)}
            >
              <h1 className="text-gray-700 font-semibold">
                {e.market_cap_rank}. <span className="text-xl">{e.name}</span>
              </h1>

             
             

              <div className="font-light">
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
              </div></div>

              <div className="mr-0 justify-center items-center flex text-lg font-semibold w-1/2 max-w-1/2">USD {e.current_price.toLocaleString("es-AR")}</div>
         

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
                    className="text-2xl text-gray-500 cursor-pointer"
                    onClick={() => addFavToUpload(e.id)}
                  />
                </Fade>
              )}
            </div></div>
          </section>
        </div>
      ))}
    </div>
  );
}

export default ShowCoins;
