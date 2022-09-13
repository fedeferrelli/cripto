import React, {useState, useEffect} from 'react';

import {Fade} from 'react-awesome-reveal';
import { AiFillHeart, AiOutlineHeart, AiOutlineLoading } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

import db from "../assets/firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";


function ShowList({e, setCheckFavourites}) {

    const [favouritesLoading, setFavouritesLoading] = useState(undefined);
    //const [checkFavourites, setCheckFavourites] = useState(false);
    const [favourites, setFavourites] = useState([]);

    const navigate = useNavigate();

  /*   useEffect(() => {
        const downloadFavourites = async () => {
          const querySnapshot = await getDocs(collection(db, "coins"));
          querySnapshot.forEach((doc) => {
            setFavourites(doc.data().favs);
            setFavouritesLoading(undefined);
            
          });
        };
        downloadFavourites();
      }, [checkFavourites]); */
    
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

    return (
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
              <h1 className="text-gray-700 font-semibold">
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
    )
}

export default ShowList
