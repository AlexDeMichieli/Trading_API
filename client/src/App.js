import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Chart from './components/chart'



const ENDPOINT = "localhost:5000";

const App = () => {
  const [response, setResponse] = useState([]);
  let array = []

  useEffect(() => {

    const socket = socketIOClient(ENDPOINT);
    socket.on('userconnected', (event) =>{
  
      const socket = new WebSocket('wss://ws.finnhub.io?token=');
  
      socket.addEventListener('open', function (event) {
          // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
          // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
          // subscribe.addEventListener("click", function(){
          // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
          // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
          // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
    
       }); 
  
      // Connection opened -> Subscribe
      // Listen for messages
      socket.addEventListener('message', function (event) {
          let obj = JSON.parse(event.data) 
          setResponse(obj.data)

      //     function deepIterator (target) {
      //       if (typeof target === 'object') {
      //         for (const key in target) {
      //           deepIterator(target[key]);
      //         }
      //       } else {
      //         array.push(target);
      //         console.log(array)

      //         setResponse(array)

      //       }
      //     }

      //     deepIterator(obj)

      });

        
     let subscribe = document.getElementById('subscribe')
     let unsubscribe = document.getElementById('unsubscribe')
  
      unsubscribe.addEventListener("click", function(symbol){
        console.log('unsubscribed ')
        socket.send(JSON.stringify({'type':'unsubscribe','symbol': 'BINANCE:BTCUSDT'}))
      })

      subscribe.addEventListener("click", function(symbol){
        console.log('subscribed ')
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
       })
  })
  return () => socket.disconnect();

  }, []);

 
  // let obj = {"data":[{"p":10929.47,"s":"BINANCE:BTCUSDT","t":1595916553550,"v":0.0015}],"type":"trade"}

  const values = () =>{

    for (let key in response){
      let timeStamp = new Date(response[key].t).toLocaleTimeString("en-US")
      return(
        
        <Chart price = {2} time = {3}/>

        
        /* <div>
        <p>price {response[key].p}</p>
        <p>symbol {response[key].s}</p>
        <p>time {timeStamp}</p>

        </div> */
      

        )

  } 

}

  return (

    <div>
      <button id = "subscribe" type="button">Subscribe</button>
      <button id = "unsubscribe" type="button"> Unsubscribe</button>
    <div>
    {values()}
    </div>
    <Chart/>
    </div>
  );
}

export default App;
