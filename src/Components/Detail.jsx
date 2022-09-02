import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeatailHeader from "./Detail/DeatailHeader";
import DetailChanges from "./Detail/DetailChanges";
import DetailMoreData from "./Detail/DetailMoreData";

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

        <>

        <DeatailHeader coin={tokenData}/>

        <DetailChanges coin={tokenData}/>

        <DetailMoreData coin = {tokenData}/>

        </>

      ) : null}
    </div>
  );
}

export default Detail;
