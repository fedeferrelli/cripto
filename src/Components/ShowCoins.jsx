import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../assets/Loading";
import ShowList from "../assets/ShowList";

function ShowCoins({ data }) {
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [showLoading, setShowLoading] = useState(true);

  const navigate = useNavigate();

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
      {/* navegador */}
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

      {/* Loading */}

      {showLoading && (
        <div className="w-full h-screen flex">
          <Loading />
        </div>
      )}

      <ShowList data={filteredData} />
    </div>
  );
}

export default ShowCoins;
