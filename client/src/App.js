import React, { useState, useRef, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Chart from './components/chart'
import useInterval from './components/interval';


const ENDPOINT = "localhost:5000";

const App = () => {
  const [response, setResponse] = useState([]);
  const [unsubscribe, setUnsuscribe] = useState(false)
  const [subscribe, setSubscribe] = useState(true)
  const [symbol, setSymbol] = useState({
    coin: "IC MARKETS:1"
  });
  
  let array = []
  const test = () =>{
    console.log('interval')
    // setResponse([...array])
  }

  useEffect(() => {
  
    const socket = socketIOClient(ENDPOINT);

    socket.on('userconnected', (event) =>{
      
      const socket = new WebSocket('wss://ws.finnhub.io?token=bsjfs77rh5rcthrmat10');
  
      // Connection opened -> Subscribe
      // Listen for messages
      socket.addEventListener('message', function (event) {
         

          // console.log(event.data)
          let stream = JSON.parse(event.data)

          //extracting information from websocket response
          for (let key in stream.data){
                for (let values in stream.data[key]){
          //prepating array with object for chart
               let timeStamp = new Date(stream.data[key].t).toLocaleTimeString("en-US")
          
                  let chartData = {
                          price: stream.data[key].p,
                          time: timeStamp, 
                          name: stream.data[key].s
                  }

                            array.push(chartData) 
                            
                }
          }
                  
      });
        
     let subscribe = document.getElementById('subscribe')
     let unsubscribe = document.getElementById('unsubscribe')

     
      socket.onopen = () =>{

          // const test = () =>{
          //   console.log('interval')
          //   setResponse([...array])
          // }
    
           unsubscribe.addEventListener("click", function(){
            clearInterval(test)
            setUnsuscribe(false)
            setSubscribe(true)

            console.log(`unsubscribed to ${symbol.coin}`)
            socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol.coin}))
          })
    
          subscribe.addEventListener("click", function(){
         
            setInterval(test, 5000)
            setSubscribe(false)
            setUnsuscribe(true)
         
            setTimeout( socket.send(JSON.stringify({'type':'subscribe','symbol': symbol.coin})), 1000)
                        clearInterval(test)

          })

      }

   })

  }, [symbol]);



  const onChange = e => {
    const { name, value } = e.target;
    clearInterval(test)

    setSymbol({[name]: value });
    
  };

  const charts = () => {
    return (
      <Chart data={response} x ={response.x} y = {response.y}/>
    )
  }

  return (

    <div>
      <button id = "subscribe" disabled = {!subscribe}type="button">Subscribe</button>
      <button id = "unsubscribe" disabled = {!unsubscribe} type="button"> Unsubscribe</button>
    <div>
    <label for="symbol">Choose a symbol:</label>
    {/* https://api.binance.com/api/v3/ticker/price */}
    <select disabled = {!subscribe} onChange={onChange} name="coin"  id="symbol">
    <option value="IC MARKETS:1">IC MARKETS:1</option>
     <option value="BINANCE:ETHBTC">BINANCE:ETHBTC</option>
     <option value="BINANCE:BTCUSDT">BINANCE:BTCUSDT</option>
     <option value="BINANCE:ZRXETH">BINANCE:ZRXETH</option>

    </select>
    {/* {console.log(typeof response, response)} */}
    </div>
   {/* {console.log(symbol)} */}
    {charts()}
    </div>
  );
}

export default App;
