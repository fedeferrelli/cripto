import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

function Detail() {

    const [tokenData, setTokenData] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
          const token = await JSON.parse(sessionStorage.getItem("token"));
          setTokenData(token);
          console.log('fede:', token)
        };
    
        getData();
      }, []);
    
    return (
        
        <div className="text-white">
            {tokenData ? 
            
            <section className="min-h-screen flex flex-col ">

<h1 className="w-full mx-auto text-2xl text-center"> {tokenData.name }</h1>

<div className="w-full mx-auto text-2xl text-center font-bold mt-4">{tokenData.current_price.toLocaleString('DE-de')}</div>
<img src={tokenData.image} alt="coin_img" className="w-48 m-auto rounded-full shadow-lg shadow-black/50"/>
           
           
           <div className="rounded-full w-48 text-center mb-4 ml-4 px-4 py-2 border border-white shadow-lg shadow-gray-800" onClick={()=>navigate('/')}>Back to list</div>
           
            </section>
            
            
            
            
           
            
            
            : null}
        </div>
    )
}

export default Detail


