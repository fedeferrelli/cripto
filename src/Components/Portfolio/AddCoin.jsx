import React, { useState, useEffect } from "react";
import db from "../../assets/firebase";
import Loading from "../../assets/Loading";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { Fade } from "react-awesome-reveal";

function AddCoin({ setShowAddCoin, data }) {
  const [filteredData, setFilteredData] = useState("");
  const [showFilteredData, setShowFilteredData] = useState(false);

  const [coinToShowInInput, setCoinToShowInInput] = useState();
  const [coinToAdd, setCoinToAdd] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [date, setDate] = useState();
  const [price, setPrice] = useState();

  const [errorCoinToAdd, setErrorCoinToAdd] = useState("");
  const [errorCantidad, setErrorCantidad] = useState("");

  const [showErrorCoinToAdd, setShowErrorCoinToAdd] = useState(false);
  const [showErrorCantidad, setShowErrorCantidad] = useState(false);

  const [showValueAtInput, setShowValueAtInput] = useState(false);

  const [dataToUpload, setDataToUpload] = useState([]);

  const [checkPortfolio, setCheckPortfolio] = useState(false);

  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const downloadPortfolio = async () => {
      const querySnapshot = await getDocs(collection(db, "coinsPort"));
      querySnapshot.forEach((doc) => {
        setDataToUpload(doc.data().port);
      });
    };
    downloadPortfolio();
  }, [checkPortfolio]);

  const uploadPortfolio = async (arrPortfolio) => {
    await setDoc(doc(db, "coinsPort", "portfolio"), {
      port: arrPortfolio,
    });

    setCheckPortfolio(!checkPortfolio);
    setShowAddCoin(false);
  };

  const addCoinToAdd = (index, coinToAdd) => {
    setCoinToAdd(
      data.filter((e) =>
        e.name.toLowerCase().includes(filteredData.toLowerCase())
      )[index].id
    );

    setCoinToShowInInput(
      data.filter((e) =>
        e.name.toLowerCase().includes(filteredData.toLowerCase())
      )[index].name
    );

    setDate(new Date());

    let price = data.find(
      (e) =>
        e.id ===
        data.filter((e) =>
          e.name.toLowerCase().includes(filteredData.toLowerCase())
        )[index].id
    );

    setPrice(price.current_price);

    setShowFilteredData(false);
    setShowValueAtInput(true);
  };

  const clearValueToAdd = () => {
    setShowErrorCoinToAdd(false);
    setShowFilteredData(true);
    setCoinToAdd("");
    setFilteredData("");
    setShowValueAtInput(false);
  };

  const uploadCoin = (coin, quantity) => {
    if (coin <= 0) {
      setErrorCoinToAdd("Debes ingresar una cripto");
      setShowErrorCoinToAdd(true);
    } else if (quantity <= 0) {
      setErrorCantidad("Debes ingresar un valor no negativo");
      setShowErrorCantidad(true);
    } else {
      uploadPortfolio([
        ...dataToUpload,
        {
          coinId: coinToAdd,
          qty: cantidad,
          date: date,
          current_price: price,
          value: cantidad * price,
        },
      ]);
      setShowLoading(true);
    }
  };

  return (
    <Fade
      duration="300"
      className="w-full sm:m-auto flex h-screen fixed bottom- right-0 left-0 top-0 bg-gray-100/90 z-50"
    >
      {showLoading && (
        <div className="w-full">
          <Loading />
        </div>
      )}

      <section className="w-11/12 sm:w-96 mt-20 mb-auto mx-auto flex flex-col border border-gray-300/50 bg-gray-200 shadow-md rounded-lg p-4">
        <h1 className="w-full text-gray-700 px-6 text-center m-auto text-xl mb-5">
          ¿Qué cripto querés agregar a tu portafolio?
        </h1>

        <section className="mb-6 flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Cripto"
              className="w-full  p-2 rounded-md bg-gray-200 border border-gray-500 outline-gray-600"
              onClick={() => clearValueToAdd()}
              onChange={(e) => setFilteredData(e.target.value)}
              value={showValueAtInput ? coinToShowInInput : filteredData}
            ></input>
            {showErrorCoinToAdd && (
              <div className="text-red-500 text-sm pl-2">{errorCoinToAdd}</div>
            )}
            <div className="absolute w-full bg-gray-400 ">
              {showFilteredData && filteredData.length >= 3 && (
                <>
                  <div className="w-full border-b-[0.2px] border-gray-700 p-1 italic text-gray-200">
                    <div onClick={() => setShowFilteredData(false)}>
                      Cancelar
                    </div>
                  </div>
                  {data
                    .filter((e) =>
                      e.name.toLowerCase().includes(filteredData.toLowerCase())
                    )
                    .map((i, index) => (
                      <div
                        key={index}
                        className="w-full border-b-[0.2px] border-gray-700 p-2 italic sm:cursor-pointer"
                        onClick={() => addCoinToAdd(index)}
                      >
                        {i.name}
                      </div>
                    ))}{" "}
                </>
              )}
            </div>

            <div className="mt-4">
              <input
                type="number"
                placeholder="Cantidad"
                className="w-full  p-2 rounded-md bg-gray-200 border border-gray-500 outline-gray-600 mb-0"
                onClick={() => setShowErrorCantidad(false)}
                onChange={(e) => setCantidad(e.target.value)}
              ></input>
              {showErrorCantidad && (
                <div className="text-red-500 text-sm mt-0 pl-2">
                  {errorCantidad}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="w-full flex flex-row gap-3">
          <button
            onClick={() => uploadCoin(coinToAdd, cantidad)}
            className="w-full rounded-lg m-auto text-center py-2 text-lg  bg-green-600/95 text-gray-800"
          >
            Agregar
          </button>

          <button
            onClick={() => setShowAddCoin(false)}
            className="w-full rounded-lg text-gray-800 m-auto text-lg text-center py-2  bg-red-500/95 cursor-pointer"
          >
            Cancelar
          </button>
        </section>
      </section>
    </Fade>
  );
}

export default AddCoin;
