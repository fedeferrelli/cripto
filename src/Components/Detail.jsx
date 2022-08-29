import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Detail() {
  const [tokenData, setTokenData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const token = await JSON.parse(sessionStorage.getItem("token"));
      setTokenData(token);
     
    };

    getData();
  }, []);

  return (
    <div className="text-white pt-4 flex flex-col">
      <div
        className="rounded-full w-32 text-center bottom-3 ml-4 p-3 py-1 text-gray-600 border border-gray-600 shadow-md fixed shadow-gray-800"
        onClick={() => navigate("/")}
      >
        Back to list
      </div>

      {tokenData ? (
        <section className="min-h-screen flex flex-col ">
          <h1 className="w-full mx-auto text-3xl text-center">
            {" "}
            {tokenData.name}
          </h1>

          <div className="w-full mx-auto text-2xl text-center font-bold mt-4">
            {tokenData.current_price.toLocaleString("DE-de")}
          </div>
          <img
            src={tokenData.image}
            alt="coin_img"
            className="w-48 m-auto rounded-full shadow-lg shadow-black/50"
          />
        </section>
      ) : null}
    </div>
  );
}

export default Detail;
