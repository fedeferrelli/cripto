import React from 'react'

function DetailChanges({coin}) {

    const data = [
        {name:'1 h', value: coin.price_change_percentage_1h_in_currency},
        /* {name:'24 h', value: coin.price_change_percentage_24h_in_currency}, */
        {name:'7 d', value: coin.price_change_percentage_7d_in_currency},
        {name:'14 d', value: coin.price_change_percentage_14d_in_currency},
        {name:'30 d', value: coin.price_change_percentage_30d_in_currency},
        {name:'200 d', value: coin.price_change_percentage_200d_in_currency},
        {name:'1 y', value: coin.price_change_percentage_1y_in_currency},
        {name:'fede', value: coin.price_change_percentage_1y_in_currencyt},

    ]

    return (
        <section className="w-11/12 mx-auto flex flex-wrap gap-0 mt-3">

 {data.map(e=>

 ( 
     typeof(e.value) !== 'undefined' &&
<div key={e.name} className="w-1/3 p-2 text-white">
    <div className="border border-gray-600 shadow-lg shadow-gray-800/50 rounded-md text-center">
        <h1>{e.name}</h1>
        
                         
          {e.value<0 ? 
          <span className="text-red-500 "> {e.value.toFixed(2).toLocaleString('de-DE')}%</span>
          : 
          <span className="text-green-700"> {e.value.toFixed(2).toLocaleString('de-DE')}%</span>}

    </div> 
    </div>
    
 )


    
    
    )} 

{/* {data[6].value} */}
            
        </section>
    )
}

export default DetailChanges