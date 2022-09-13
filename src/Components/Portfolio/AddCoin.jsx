import React, {useState, useEffect} from 'react';
import db from '../../assets/firebase'
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

function AddCoin({setShowAddCoin, data}) {

    

    const [filteredData, setFilteredData] = useState("");
    const [showFilteredData, setShowFilteredData] = useState(false);
    
    const [coinToShowInInput, setCoinToShowInInput] = useState();
    const [coinToAdd, setCoinToAdd] = useState("")
    const [cantidad, setCantidad] = useState(0)

    const [errorCoinToAdd, setErrorCoinToAdd] = useState("")
    const [errorCantidad, setErrorCantidad] = useState("")

    const [showErrorCoinToAdd, setShowErrorCoinToAdd] = useState(false)  
    const [showErrorCantidad, setShowErrorCantidad] = useState(false)

    const [showValueAtInput, setShowValueAtInput] = useState(false);

    const [dataToUpload, setDataToUpload] = useState([]);

    const [checkPortfolio, setCheckPortfolio] = useState(false)

    console.log(coinToAdd)

    console.log(filteredData)
    console.log(cantidad)

    useEffect(() => {
        const downloadPortfolio = async () => {
          const querySnapshot = await getDocs(collection(db, "coinsPort"));
          querySnapshot.forEach((doc) => {
            setDataToUpload(doc.data().port);
           // setFavouritesLoading(undefined);
            
          });
        };
        downloadPortfolio();
      }, [checkPortfolio]);

    const uploadPortfolio = async (arrPortfolio) => {
        await setDoc(doc(db, "coinsPort", "portfolio"), {
          port: arrPortfolio,
        });
    
        setCheckPortfolio(!checkPortfolio);
      };

    const addCoinToAdd = (index) =>{

        setCoinToAdd(data.filter(e=>(e.name.toLowerCase().includes(filteredData.toLowerCase())))[index].id)

        setCoinToShowInInput(data.filter(e=>(e.name.toLowerCase().includes(filteredData.toLowerCase())))[index].name)
        setShowFilteredData(false);
        setShowValueAtInput(true)


    }

    const clearValueToAdd = () =>{
        setShowErrorCoinToAdd(false)
        setShowFilteredData(true);
        setCoinToAdd("")
        setFilteredData("")
        setShowValueAtInput(false)

    }


    const uploadCoin = (coin, quantity) =>{

        if(coin<=0){
            setErrorCoinToAdd('Debes ingresar una cripto');
            setShowErrorCoinToAdd(true)
        }
        else if(quantity<=0){
            setErrorCantidad('Debes ingresar un valor no negativo');
            setShowErrorCantidad(true)
        }
        else {
            uploadPortfolio([...dataToUpload, {coinId:coinToAdd, qty : cantidad}]);
            setShowAddCoin(false)}

    }

    console.log(dataToUpload)

    return (
        <div className="w-full flex h-screen fixed bg-gray-400 z-50">
            
            <section className="w-11/12 mt-20 mb-auto mx-auto flex flex-col border border-gray-500 bg-gray-300 shadow-md rounded-lg p-4">

                <h1 className="w-full text-gray-700 px-6 text-center m-auto text-xl mb-5">¿Qué cripto querés agregar a tu portafolio?</h1>

            <section className="mb-6 flex flex-col gap-4">

                <div className="relative">

                <input type='text' placeholder="Cripto" className="w-full  p-2 rounded-md bg-gray-200 border border-gray-500 outline-gray-600" onClick={()=>clearValueToAdd()} onChange={(e)=>setFilteredData(e.target.value)} value={showValueAtInput ? coinToShowInInput : filteredData} >
                </input>
                {showErrorCoinToAdd && <div className="text-red-500 text-sm pl-2">{errorCoinToAdd}</div>}
                <div className="absolute w-full bg-gray-400 ">

               


                    {showFilteredData &&  filteredData.length>=3 &&
                    
                    <>
                     <div className="w-full border-b-[0.2px] border-gray-700 p-1 italic text-gray-200" 
                        ><div onClick={()=> setShowFilteredData(false)}>Cancelar</div></div>

                    {data.filter(e=>(e.name.toLowerCase().includes(filteredData.toLowerCase())))
                    .map((i, index)=>(
                        <div key={index} className="w-full border-b-[0.2px] border-gray-700 p-2 italic" 
                        onClick={()=> addCoinToAdd(index)}>{i.name}</div>
                    ))} </> }

                </div>
              
<div className="mt-4">
                <input type='number' placeholder="Cantidad" className="w-full  p-2 rounded-md bg-gray-200 border border-gray-500 outline-gray-600 mb-0" onClick={()=>setShowErrorCantidad(false)} onChange={(e)=>setCantidad(e.target.value)}>
                </input>
                {showErrorCantidad && <div className="text-red-500 text-sm mt-0 pl-2">{errorCantidad}</div>}
                </div>
                </div>




            </section>
           
           
           
           
           
           
           
            <section className="w-full px-1 flex flex-row gap-3">

            <button onClick={()=>uploadCoin(coinToAdd, cantidad)} className="w-full m-auto text-center py-2  bg-green-700/95 text-gray-800">Agregar</button>
            
            <button onClick={()=>setShowAddCoin(false)} className="w-full text-gray-800 m-auto text-center py-2  bg-red-600/95 cursor-pointer">Cancelar</button>
            </section>
            
            
            
            
            
            </section>
            
            
           
        </div>
    )
}

export default AddCoin
