import React,{useState} from 'react';
import {Fade} from 'react-awesome-reveal'

function DetailMoreData({coin}) {

    const [show, setShow] = useState(false);
    const date = new Date(coin.ath_date);
    const [month, day, year]= [date.getMonth()+1, date.getDate(), date.getFullYear()];

    return (
        
<section className="w-11/12 mx-auto text-white font-light">
        { show ? 

           <Fade className="w-full mx-auto mt-2 text-white animate-bounce-once text-center">
               
               
               <div>Market Cap: USD {BigInt(coin.market_cap.toFixed()).toLocaleString('de-DE')} <span className="italic font-light">({coin.market_cap_rank})</span></div>
               <div>Market Cap daily change : {(coin.market_cap_change_percentage_24h).toFixed(2).toLocaleString('de-DE')}% </div>
               <div>Circulación: {BigInt(coin.circulating_supply.toFixed()).toLocaleString('de-DE')} </div>
               { coin.max_supply && <div>Oferta máxima: {BigInt(coin.max_supply.toFixed()).toLocaleString('de-DE')} </div>}
               <div>All time high: USD {coin.ath.toFixed(2).toLocaleString('de-DE')} </div>
               <div>ATH date: {day}/{month}/{year} </div>
               
               <div onClick={()=>setShow(!show)} className="w-11/12 mx-auto mt-2 text-gray-600 text-center">Show less</div>    
               
           </Fade>
           :

           <div onClick={()=>setShow(!show)} className="w-11/12 mx-auto mt-2 text-gray-600 text-center">Show more</div>
           

        }


        </section>        
        
    )
}

export default DetailMoreData
