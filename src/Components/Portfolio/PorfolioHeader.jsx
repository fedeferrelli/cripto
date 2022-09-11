import React from 'react'

function PortfolioHeader({portfolioValue, portfolioChange_1d}) {

  console.log(portfolioChange_1d)

  console.log(portfolioValue, portfolioChange_1d)
    return (
        <section className="flex flex-col pt-4">
        
        <h1 className="w-full mx-auto mt-2 text-4xl text-center">
          Mi Portfolio
        </h1>

        <div className="w-full mx-auto text-3xl text-center font-bold mt-2">
          USD {Number(portfolioValue).toLocaleString("DE-de")}
        </div>

        <div className="font-light mx-auto text-xl">Daily Change: 
                  
          {portfolioChange_1d<0 ? 
          <span className="text-red-500 font-bold"> {portfolioChange_1d.toFixed(2).toLocaleString('de-DE')}%</span>
          : 
          <span className="text-green-700 font-bold"> {portfolioChange_1d.toFixed(2).toLocaleString('de-DE')}%</span>}</div>

      </section>
    )
}

export default PortfolioHeader;
