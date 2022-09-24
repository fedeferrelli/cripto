import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {AiOutlineArrowLeft} from 'react-icons/ai';


function Operations() {

  const [operations, setOperations] = useState();

  const navigate=useNavigate();

  useEffect(() => {
    const getData = async () => {
      const operation = await JSON.parse(sessionStorage.getItem("operations"));
      setOperations(operation);
      console.log(operation)
     
    };

    getData();
  }, []);


  const manageDate = (seconds) =>{

    console.log(seconds)

    let weekdays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado" ]
   let months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",]
    let date = new Date(seconds*1000);
    
    let weekday = weekdays[date.getDay()];
    let day =  date.getDate();
    let month =  months[date.getMonth()];
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    if(minutes<10){minutes = "0"+minutes}

    return  `${weekday} ${day} de ${month} de ${year}, ${hour}:${minutes}`



  }


    return (
        
      <div className="text-gray-600 pt-4 flex flex-col">
      <div
        className="rounded-full w-auto sm:cursor-pointer text-center bottom-3 ml-4 px-5 py-2 flex gap-2 text-gray-600 border border-gray-400 shadow-md fixed shadow-gray-400 bg-gray-100"
        onClick={() => navigate(-1)}
      >
        <AiOutlineArrowLeft className="text-gray-400 text-lg m-auto"/>
        <span className="">Volver</span>
      </div>

      {operations ? (

        

        <section className="pb-20">

       
        <section className="flex flex-col pt-4">
        <img
          src={operations.image}
          alt="coin_img"
          className="w-24 mx-auto drop-shadow-lg shadow-white/50 animate-spin-once"
        />
        <h1 className="w-full mx-auto mt-2 text-4xl text-center">
          {" "}
          {operations.name}
        </h1>

        <div className="w-full mx-auto text-3xl text-center font-bold mt-2">
          USD {operations.totalValue.toFixed(2).toLocaleString("DE-de")}
        </div>

        <div className="w-full mx-auto text-center text-lg font-light mt-1">
          cantidad {operations.qty.toLocaleString("DE-de")}
        </div>
        
        <div className="w-full mx-auto text-center text-lg font-light mt-1">
          precio USD {operations.current_price.toFixed(2).toLocaleString("DE-de")}
        </div>

      </section>

        <div className="text-gray-800 font-semibold text-center mt-8  text-2xl"><span className="">{operations.operations.length}</span> operaciones: </div>

        {operations.operations.map((e, index)=>
        <div key={index} className="w-11/12 bg-gray-200 flex flex-col mt-4 m-auto rounded-md p-3 border border-gray-300/50 shadow-md">
        
          <div className=" text-center text-gray-800 font-semibold">{manageDate(e.date)}</div>

          <div className="mt-3 text-center text-gray-800 flex flex-row">

            <div className="w-2/3 text-left">

          <div>cantidad: {Number(e.qty).toLocaleString('DE-de')}</div>

          <div>price: USD {e.price.toLocaleString('DE-de')}</div>

         <div>value: USD {e.value.toLocaleString('DE-de')}</div>
          </div>

          <div className="w-1/3 text-right flex justify-center items-center">

          <div className="m-auto text-xl font-semibold w-20 h-20 rounded-full bg-gray-300 shadow-lg flex">
            <span className= {(operations.current_price/e.price-1) < 0 ? 'text-red-500 m-auto' : 'text-green-700 m-auto '} >
              
            {((operations.current_price/e.price-1)*100).toFixed(2)}%

              </span></div>
          </div>

          </div>
          
          
          
          </div>)
            
        }
          
        </section>

       ): null      
        
    }


    </div>)}

export default Operations;
