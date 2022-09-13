import React, {useState, useEffect} from 'react';
import db from "../assets/firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";
import { AiFillHeart, AiOutlineHeart, AiOutlineLoading } from "react-icons/ai";
import { Fade } from "react-awesome-reveal";





function Favourites() {

    const [dataFavourites, setDataFavourites] = useState();
    const [favourites, setFavourites] = useState(['nothing-to-show']);
    const [checkFavourites, setCheckFavourites] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const [filter, setFilter] = useState("")
    const [favouritesLoading, setFavouritesLoading] = useState(undefined);
    const navigate = useNavigate();

    const baseURL ="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y"



  useEffect(() => {

    const downloadFavourites = async () => {
        const querySnapshot = await getDocs(collection(db, "coins"));
        querySnapshot.forEach((doc) => {
            setFavourites(doc.data().favs);                 
        });     
        setShowLoading(false);   
      };
      downloadFavourites();   
  }, [checkFavourites]);

  

  useEffect(() => {

    const getData = async () => {
       
      try {
        await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${favourites.join('%2C')}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y`)
          .then((response) => response.json())
          .then((data) => setDataFavourites(data.filter(e=>
            e.name.toLowerCase().includes(filter.toLowerCase()) ||
              e.symbol.toLowerCase().includes(filter.toLowerCase()) ||
              e.id.toLowerCase().includes(filter.toLowerCase()))));
      } catch (err) {
        console.log(err);
      }
    };

    getData();
      
  }, [favourites, filter])

  const deleteFavToUpload = (n) => {
    let newFavs = [...favourites.filter((i) => i != n)];
   uploadFavourites(newFavs);
  };

  const uploadFavourites = async (arrFav) => {
    await setDoc(doc(db, "coins", "favourites"), {
      favs: arrFav,
    });

    setCheckFavourites(!checkFavourites);
  };

  const setCoinToBeDetailed = (coin) => {
    sessionStorage.setItem("token", JSON.stringify(coin));
    navigate("/detailedCoin");
  };

  if (!dataFavourites) return null;
  if (favourites.length===0) return <div className="text-gray-400 w-full absolute top-0 bottom-0 flex flex-col">

   <div className="flex flex-col justify-center m-auto gap-8"> 
    <div className="m-auto w-11/12 text-2xl text-center">Todavía no agregaste ninguna moneda a favoritos</div>
    
    <div className="text-gray-600 flex pl-4"><button className="text-xl m-auto" onClick={()=>navigate('/')}>Volver a la lista</button></div>
    </div>
   
    </div>;



    return (
        <div className="max-w-[900px] m-auto flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-2">
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
         <div className="text-gray-400 flex pl-4"><button className="text-xl m-auto" onClick={()=>navigate('/')}>Lista</button></div>
         <div className="text-gray-600 flex pl-4"><button className="text-xl m-auto" >Favoritos</button></div>
         <div className="text-gray-400 flex pl-4"><button className="text-xl m-auto" onClick={()=>navigate('/portfolio')}>Portfolio</button></div>
          </div>
          </div>
  
        {showLoading && (
          <div className="w-full h-screen flex ">
            <ImSpinner9 className="m-auto text-4xl text-gray-600 animate-spin" />
          </div>
        )}
  
        {dataFavourites.map((e, index) => (
          <div
            key={index}
            className="border w-11/12 sm:w-60 bg-gray-200 border-gray-400/50 rounded-lg shadow-md shadow-gray-500 px-3 py-4 my-2 m-auto text-gray-700 relative"
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

          </div>
        ))}
      </div>
    )
}

export default Favourites
