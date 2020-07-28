import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
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

          console.log(event.data);
      //     let obj = JSON.parse(event.data) 

      //     function deepIterator (target) {
      //       if (typeof target === 'object') {
      //         for (const key in target) {
      //           deepIterator(target[key]);
      //         }
      //       } else {
      //         // console.log(target)
      //         // array.push(target)
      //         array.push(target);
      //       }
      //     }

      //     deepIterator(obj)

      });

        
     let subscribe = document.getElementById('subscribe')
     let unsubscribe = document.getElementById('unsubscribe')
  
      unsubscribe.addEventListener("click", function(symbol){
        console.log('unsubscribed ')
        socket.send(JSON.stringify({'type':'unsubscribe','symbol': 'TSLA'}))
      })

      subscribe.addEventListener("click", function(symbol){
        console.log('subscribed ')
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'TSLA'}))
       })
  })
  return () => socket.disconnect();

  }, []);

  return (

    <div>
      <button id = "subscribe" type="button">Subscribe</button>
      <button id = "unsubscribe" type="button"> Unsubscribe</button>
    <p>
    {/* {console.log(array)} */}
    </p>
    </div>
  );
}

export default App;
