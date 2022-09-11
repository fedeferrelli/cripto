import React, {useState, useEffect} from 'react';
import db from '../../assets/firebase'
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import PortfolioChart from '../../assets/Charts/PortfolioChart'
import PortfolioHeader from './PorfolioHeader';
import DetailChanges from '../Detail/DetailChanges'

function Portfolio({data}) {
    
    //const [portfolio, setPortfolio] = useState([])
    const [portfolioValue, setportfolioValue] = useState()
    const [chartCoin, setChartCoin] = useState([]);
    const [chartWeight, setChartWeight] = useState([]);
    const [portfolioChanges, setPortfolioChanges] = useState([]);
    
 
    const portfolio = [{coinId:'bitcoin', qty : 0.0015}, 
                       {coinId:'ethereum', qty : 0.07}, 
                        {coinId:'okb', qty : 3},
                        {coinId:'tether', qty : 80},
                        ]

    const navigate = useNavigate();
 
/* useEffect(() => {

    const downloadPortfolio = async () => {
        const querySnapshot = await getDocs(collection(db, "portfolio"));
        querySnapshot.forEach((doc) => {
            setPortfolio(doc.data().favs);                 
        });     
        //setShowLoading(false);   
        };
        downloadPortfolio();   
    }, []); */                    

    portfolio.map(e=>
        data.find(coin=>
           { if (coin.id===e.coinId){
               e.price = coin.current_price,
               e.totalValue = e.qty * e.price,
               e.name = coin.name
               e.image = coin.image
               e.price_change_percentage_1h_in_currency = coin.current_price/(1+coin.price_change_percentage_1h_in_currency/100)
               e.price_change_percentage_24h = coin.current_price/(1+coin.price_change_percentage_24h
                /100)
               e.price_change_percentage_7d_in_currency = coin.current_price/(1+coin.price_change_percentage_7d_in_currency/100)
               e.price_change_percentage_14d_in_currency = coin.current_price/(1+coin.price_change_percentage_14d_in_currency/100)
               e.price_change_percentage_30d_in_currency = coin.current_price/(1+coin.price_change_percentage_30d_in_currency/100)
               e.price_change_percentage_200d_in_currency = coin.current_price/(1+coin.price_change_percentage_200d_in_currency/100)
               e.price_change_percentage_1y_in_currency = coin.current_price/(1+coin.price_change_percentage_1y_in_currency/100)
           }
           }))

    console.log(portfolio) 
    
    
        


useEffect(() => {
    

    let value = portfolio.reduce((a, b) => a + b.totalValue,
    0);

    setportfolioValue(value)
    
}, [portfolio]);

useEffect(() => {
    
    let objAux=[];
    let valueKeys=['price_change_percentage_24h', 'price_change_percentage_1h_in_currency', 'price_change_percentage_7d_in_currency', 'price_change_percentage_14d_in_currency', 'price_change_percentage_30d_in_currency', 'price_change_percentage_200d_in_currency', 'price_change_percentage_1y_in_currency']

    valueKeys.map(e=>(
        
            objAux[e]= ((portfolioValue / portfolio.reduce( (a, b) => a + b[e]*b.qty, 0 ))-1)*100

        
      
    ))

    setPortfolioChanges(objAux)
    
}, [portfolioValue])

console.log(portfolioChanges) 



useEffect(() => {
    
    const auxChartCoin =[];
    const auxChartWeight =[];
    
    portfolio.map(e=>{
        auxChartCoin.push(e.name);
        auxChartWeight.push(Number((e.totalValue/portfolioValue*100).toFixed(2)))
    })

    console.log(auxChartWeight)
    setChartCoin(auxChartCoin);
    setChartWeight(auxChartWeight)
    
}, [portfolioValue])

console.log(chartWeight)

    return (

      <div>
             <div className="m-auto w-full sticky top-0 py-2 bg-gray-100  z-50">
        <div className="w-11/12 m-auto flex justify-end">
        {/* <input
          type="text"
          placeholder="Buscar"
          className="italic  px-3 py-2 bg-gray-200 border border-gray-600 rounded-lg shadow-sm shadow-gray-800  m-auto text-gray-400 outline-none w-20 focus:w-full focus:border-indigo-800 ease-in-out duration-300 ml-0"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        ></input> */}
         <div className="text-gray-400 flex pl-4"><button className="text-xl m-auto" onClick={()=>navigate('/')}>Lista</button></div>
         <div className="text-gray-400 flex pl-4"><button className="text-xl m-auto" onClick={()=>navigate('/favourites')}>Favoritos</button></div>
         <div className="text-gray-600 flex pl-4"><button className="text-xl m-auto" >Portfolio</button></div>
         </div>
      </div>
        
          { typeof(portfolioChanges.price_change_percentage_24h) !== 'undefined' && <PortfolioHeader  portfolioValue={portfolioValue} portfolioChange_1d={portfolioChanges.price_change_percentage_24h}/>
        }
        
        <div className="w-11/12 m-auto mt-8">
          <PortfolioChart coins={chartCoin} weights={chartWeight} />
        </div>
 

        <DetailChanges coin={portfolioChanges} />

        {portfolio.map((e) => (
          <div
            key={e.name}
            className="w-11/12 bg-gray-400 m-auto rounded-lg my-3 p-3"
          >
            <div className="flex flex-row items-center gap-2">
              <img
                src={e.image}
                alt="coin_img"
                className="w-8 rounded-full shadow-lg shadow-black/50"
              />
              <h1 className="text-lg">{e.name}</h1>
            </div>

            <div>
              {" "}
              {e.name}: {e.totalValue.toFixed(2).toLocaleString("de-DE")},{" "}
              {((e.totalValue / portfolioValue) * 100)
                .toFixed(2)
                .toLocaleString("de-DE")}
              %
            </div>
          </div>
        ))}
      </div>
    );
}

export default Portfolio
