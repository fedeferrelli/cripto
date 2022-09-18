import React, {useState} from 'react'

function DetailChanges({coin, setDaysToShowBigScreens}) {

  const [days, setDays] = useState('7 d')

    const data = [
        {name:'1 d', value: coin.price_change_percentage_24h},
        {name:'7 d', value: coin.price_change_percentage_7d_in_currency},
        {name:'14 d', value: coin.price_change_percentage_14d_in_currency},
        {name:'30 d', value: coin.price_change_percentage_30d_in_currency},
        {name:'200 d', value: coin.price_change_percentage_200d_in_currency},
        {name:'1 y', value: coin.price_change_percentage_1y_in_currency},
        

    ];


    const setRealDaysToShowBigScreens = (str) =>{

        let days;

        if (str==='1 d') {days=1}
        else if (str==='7 d') {days=7}
        else if (str==='14 d') {days=14}
        else if (str==='30 d') {days=30}
        else if (str==='30 d') {days=30}
        else if (str==='200 d') {days=200}
        else if (str==='1 y') {days=365}

        setDaysToShowBigScreens(days);
        setDays(str)


    }


   

    return (
        <section className="w-11/12 mx-auto flex flex-wrap justify-center gap-0 sm:w-auto mt-3 boyrder rounded-lg shjadow border-gray-400 p-4 m-auto">

 {data.map(e=>

 ( 
     typeof(e.value) !== 'undefined' &&
<div key={e.name} className="w-1/3 sm:w-auto p-2 text-gray-700 m-auto ">
    <div className="relative overflow-hidden m-auto border rounded-full shadow-md shadow-gray-300 py-2 text-center
    sm:py-1 sm:px-1 sm:w-32 sm:cursor-pointer sm:hover:shadow-lg duration-300 ease-in-out 
    bg-transparent"
    
    onClick={()=>setRealDaysToShowBigScreens(e.name)}>
       { <div className={days === e.name ? "sm:flex hidden rounded-full right-0 left-0 bg-gray-400/25 z-10   top-0 bottom-0 absolute" : undefined}></div>}
        <h1 >{e.name}</h1>
        
                         
          {e.value<0 ? 
          <span className="text-red-500 "> {e.value.toFixed(2).toLocaleString('de-DE')}%</span>
          : 
          <span className="text-green-700"> {e.value.toFixed(2).toLocaleString('de-DE')}%</span>}

    </div> 
    </div>
    
 )


    
    
    )} 

        </section>
    )
}

export default DetailChanges
