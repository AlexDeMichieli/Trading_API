import React, { useState, useRef, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Chart from './components/chart'
import { AreaChart } from "recharts";


const ENDPOINT = "localhost:5000";

const App = () => {
  const [response, setResponse] = useState([]);
  const [symbol, setSymbol] = useState({
    coin: "IC MARKETS:1"
  });
  
  let array = []
  const prevSymbolRef = useRef();

  useEffect(() => {

    prevSymbolRef.current = symbol.coin

    const socket = socketIOClient(ENDPOINT);
    socket.on('userconnected', (event) =>{
      
      const socket = new WebSocket('wss://ws.finnhub.io?token=bsjfs77rh5rcthrmat10');
  
      // Connection opened -> Subscribe
      // Listen for messages
      socket.addEventListener('message', function (event) {
          console.log(event.data)
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
                            setResponse([...array])
                            
                          

                }
          }
      });
        
     let subscribe = document.getElementById('subscribe')
     let unsubscribe = document.getElementById('unsubscribe')
     prevSymbolRef.current = symbol.coin

      socket.onopen = () =>{
        let timer = setInterval(setResponse([...array]),5000)


           //ETHBTC
           unsubscribe.addEventListener("click", function(){
            clearInterval(timer);
            console.log(`unsubscribed to ${symbol.coin}`)
            socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol.coin}))
          })
    
          subscribe.addEventListener("click", function(){
            socket.send(JSON.stringify({'type':'unsubscribed to','symbol': prevSymbol}))
            setTimeout( socket.send(JSON.stringify({'type':'subscribe','symbol': symbol.coin})), 2000)
            
           
          })

      }

   })

  }, [symbol]);

  const prevSymbol = prevSymbolRef.current;


  const onChange = e => {
    const { name, value } = e.target;
    setSymbol({[name]: value });
    
  };

  const charts = () => {
    return (
      <Chart data={response} x ={response.x} y = {response.y}/>
    )
  }

  return (

    <div>
      <button id = "subscribe" type="button">Subscribe</button>
      <button id = "unsubscribe" type="button"> Unsubscribe</button>
    <div>
    <label for="symbol">Choose a symbol:</label>
    {/* https://api.binance.com/api/v3/ticker/price */}
    <select onChange={onChange} name="coin"  id="symbol">
    <option value="IC MARKETS:1">IC MARKETS:1</option>
     <option value="BINANCE:ETHBTC">BINANCE:ETHBTC</option>
     <option value="BINANCE:BTCUSDT">BINANCE:BTCUSDT</option>
     <option value="BINANCE:ZRXETH">BINANCE:ZRXETH</option>

    </select>
    <p>Now: {symbol.coin}, before: {prevSymbol}</p>
    {console.log(typeof response, response)}
    </div>
   {console.log(symbol)}
    {charts()}
    </div>
  );
}

export default App;