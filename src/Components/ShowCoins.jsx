import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

function ShowCoins( {data} ) {

    const [filter, setFilter] = useState("");
    const [filteredData, setFilteredData] = useState([]);

  { data &&
  
    useEffect(() => {
        
      
        const getFilteredData = () =>{

            const filterAux = data.filter((e)=>
            e.name.toLowerCase().includes(filter.toLowerCase())
            ||
            e.symbol.toLowerCase().includes(filter.toLowerCase())
            ||
            e.id.toLowerCase().includes(filter.toLowerCase())
            ) 
            setFilteredData(filterAux)
        };

        getFilteredData()
    }, [filter])
}

//console.log(typeof(filteredData.map))

    const navigate = useNavigate();

    const setCoinToBeDetailed = (coin) => {
        sessionStorage.setItem("token", JSON.stringify(coin));
        navigate("/detailedCoin");
        console.log('fede')
        console.log(sessionStorage)
      };

      console.log(localStorage)
    
    return (
        <div className="max-w-[900px] m-auto flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-2">
            <input type='text' placeholder="Buscar" className="italic px-3 py-2 rounded-lg border border-white bg-transparent w-11/12 m-auto mt-2 text-gray-400 outline-none" onChange={(e)=>{setFilter(e.target.value)}}></input>	
            
    {filteredData.map((e, index)=>(
                <div onClick={()=>setCoinToBeDetailed(e)} key={index} className="border w-11/12 sm:w-60 bg-gray-600/50 border-gray-600 rounded-lg shadow-sm shadow-gray-800 px-3 py-4 my-2 m-auto text-white">
                    <section className="flex flex-row gap-4 justify-left items-center w-full">
                    <img src={e.image} alt="coin_img" className="w-12 rounded-full shadow-lg shadow-black/50"/>
                    <div className="font-semibold">
                    
                    <h1 className="text-white font-semibold">{e.market_cap_rank}. <span className="text-xl">{e.name}</span></h1>
                    
                    <div>Price: USD {e.current_price.toFixed(2).toLocaleString('de-DE')}</div>
                    
                    
                    <div className="font-light">Daily Change: 
                    
                     {e.price_change_percentage_24h<0 ? 
                     <span className="text-red-500 font-normal"> {e.price_change_percentage_24h.toFixed(2).toLocaleString('de-DE')}%</span>
                     : 
                     <span className="text-green-700 font-normal"> {e.price_change_percentage_24h.toLocaleString('de-DE')}%</span>}</div>
                    </div>
                    </section>


                </div>
            )) }
        </div>
    )
}

export default ShowCoins
