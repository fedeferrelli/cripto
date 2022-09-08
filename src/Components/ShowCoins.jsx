import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";
import { AiFillHeart, AiOutlineHeart, AiOutlineLoading } from "react-icons/ai";
import { Fade } from "react-awesome-reveal";

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
      }, [filter, checkFavourites]);
  }



  const setCoinToBeDetailed = (coin) => {
    sessionStorage.setItem("token", JSON.stringify(coin));
    navigate("/detailedCoin");
  };

  return (
    <div className="max-w-[900px] m-auto flex flex-col sm:flex-row sm:flex-wrap  gap-1 sm:gap-2">
      <div className="m-auto w-11/12 sticky top-0 py-2 bg-black flex z-10">
        <input
          type="text"
          placeholder="Buscar"
          className="italic  px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg shadow-sm shadow-gray-800  m-auto text-gray-400 outline-none w-20 focus:w-full focus:border-indigo-800 ease-in-out duration-300 ml-0"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        ></input>
         <div className="text-gray-400 flex pl-4"><button className="text-xl m-auto">Lista</button></div>
         <div className="text-gray-600 flex pl-4"><button className="text-xl m-auto" onClick={()=>navigate('/favourites')}>Favoritos</button></div>
      </div>

      {showLoading && (
        <div className="w-full h-screen flex ">
          <ImSpinner9 className="m-auto text-4xl text-gray-600 animate-spin" />
        </div>
      )}

      {filteredData.map((e, index) => (
        <div
          key={index}
          className="border w-11/12 sm:w-60 bg-gray-600/50 border-gray-600 rounded-lg shadow-sm shadow-gray-800 px-3 py-4 my-2 m-auto text-white relative"
        >
          <section className="flex flex-row gap-4 justify-left items-center w-full ">
            <img
              src={e.image}
              alt="coin_img"
              className="w-12 rounded-full shadow-lg shadow-black/50"
            />

            <div
              className="font-semibold w-full"
              onClick={() => setCoinToBeDetailed(e)}
            >
              <h1 className="text-white font-semibold">
                {e.market_cap_rank}. <span className="text-xl">{e.name}</span>
              </h1>

              <div>Price: USD {e.current_price.toLocaleString("DE-de")}</div>

              <div className="font-light">
                Daily Change:
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
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}

export default ShowCoins;
