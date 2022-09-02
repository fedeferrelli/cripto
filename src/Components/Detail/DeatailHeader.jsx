import React from 'react'

function DeatailHeader({coin}) {
    return (
        <section className="flex flex-col pt-4">
        <img
          src={coin.image}
          alt="coin_img"
          className="w-24 mx-auto drop-shadow-lg shadow-white/50 animate-spin-once"
        />
        <h1 className="w-full mx-auto mt-2 text-4xl text-center">
          {" "}
          {coin.name}
        </h1>

        <div className="w-full mx-auto text-3xl text-center font-bold mt-2">
          USD {coin.current_price.toLocaleString("DE-de")}
        </div>

        <div className="font-light mx-auto text-xl">Daily Change: 
                  
          {coin.price_change_percentage_24h<0 ? 
          <span className="text-red-500 font-bold"> {coin.price_change_percentage_24h.toFixed(2).toLocaleString('de-DE')}%</span>
          : 
          <span className="text-green-700 font-bold"> {coin.price_change_percentage_24h.toFixed(2).toLocaleString('de-DE')}%</span>}</div>

      </section>
    )
}

export default DeatailHeader;
