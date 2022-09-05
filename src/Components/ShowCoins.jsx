import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {ImSpinner9} from 'react-icons/im';
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'

function ShowCoins( {data} ) {

    console.log(data)

    const [filter, setFilter] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const [showLoading, setShowLoading] = useState(true);

    const [favourites, setFavourites] = useState([]);

   
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
            setFilteredData(filterAux);
            setShowLoading(false)
        };

        getFilteredData()
    }, [filter])
}



    const navigate = useNavigate();

    const setCoinToBeDetailed = (coin) => {
        sessionStorage.setItem("token", JSON.stringify(coin));
        navigate("/detailedCoin");
        console.log('fede')
        console.log(sessionStorage)
      };

    return (
        <div className="max-w-[900px] m-auto flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-2">


            
            
            <div className="m-auto w-11/12 sticky top-0 py-2 bg-black">
            <input type='text' placeholder="Buscar" className="italic  px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg shadow-sm shadow-gray-800  m-auto text-gray-400 outline-none w-20 focus:w-full focus:border-indigo-800 ease-in-out duration-300 ml-0" onChange={(e)=>{setFilter(e.target.value)}}></input>
            </div>

            {showLoading && <div className="w-full h-screen flex "><ImSpinner9 className="m-auto text-4xl text-gray-600 animate-spin"/></div>}
            
    {filteredData.map((e, index)=>(
                <div /* onClick={()=>setCoinToBeDetailed(e)} */ key={index} className="border w-11/12 sm:w-60 bg-gray-600/50 border-gray-600 rounded-lg shadow-sm shadow-gray-800 px-3 py-4 my-2 m-auto text-white relative">
                    <section className="flex flex-row gap-4 justify-left items-center w-full ">
                    <img src={e.image} alt="coin_img" className="w-12 rounded-full shadow-lg shadow-black/50"/>

                    <div className="font-semibold bg-yellow-500"  onClick={()=>setCoinToBeDetailed(e)}>
                    
                    <h1 className="text-white font-semibold">{e.market_cap_rank}. <span className="text-xl">{e.name}</span></h1>
                    
                    <div>Price: USD {e.current_price.toLocaleString('DE-de')
                    }</div>
                    
                    
                    <div className="font-light">Daily Change: 
                    
                     {e.price_change_percentage_24h<0 ? 
                     <span className="text-red-500 font-normal"> {e.price_change_percentage_24h.toFixed(2).toLocaleString('de-DE')}%</span>
                     : 
                     <span className="text-green-700 font-normal"> {e.price_change_percentage_24h.toFixed(2).toLocaleString('de-DE')}%</span>}</div>
                    </div>

                    <div className="right-1 top-1 absolute z-20" >

                    {
                        favourites.includes(e.symbol) ?

                        <AiFillHeart className="text-2xl text-red-500/50" onClick={()=>setFavourites([...favourites.filter(i=>i!=e.symbol)])}/>

                        :

                        <AiOutlineHeart className="text-2xl text-gray-500" onClick={()=>setFavourites([...favourites, e.symbol])}/>


                    }

                       
                        
                        
                    </div>
                    </section>


                </div>
            )) }
        </div>
    )
}

export default ShowCoins
