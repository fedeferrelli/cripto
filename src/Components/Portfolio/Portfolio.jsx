import React, {useState, useEffect} from 'react';
import db from '../../assets/firebase'
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Portfolio({data}) {
    console.log(data)
    //const [portfolio, setPortfolio] = useState([])
    const [portfolioValue, setportfolioValue] = useState()
 
    const portfolio = [{coinId:'bitcoin', qty : 0.0015}, 
                       {coinId:'ethereum', qty : 0.07}, 
                        {coinId:'okb', qty : 3}]

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
           }
           }))

    console.log(portfolio)       

useEffect(() => {
    

    let value = portfolio.reduce((a, b) => a + b.totalValue,
    0);

    setportfolioValue(value)
    
}, [portfolio])

console.log(portfolioValue)

    return (
        <div>
            <div className="text-gray-600 flex pl-4"><button className="text-xl m-auto" onClick={()=>navigate('/')}>Lista</button></div>


            {portfolio.map(e=><div className="w-11/12 bg-gray-400 m-auto rounded-lg my-3 p-3">

            <div className="flex flex-row items-center gap-2">
               <img
              src={e.image}
              alt="coin_img"
              className="w-8 rounded-full shadow-lg shadow-black/50"
            /> 
            <h1 className="text-lg">{e.name}</h1>
            </div>


             <div>   {e.name}: {e.totalValue.toFixed(2).toLocaleString('de-DE')}, {((e.totalValue/portfolioValue)*100).toFixed(2).toLocaleString('de-DE')}%</div>
             </div>)}
        </div>
    )
}

export default Portfolio