import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Chart from './components/chart'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';



const ENDPOINT = "localhost:5000";

const App = () => {
  const [response, setResponse] = useState([]);
  const [symbol, setSymbol] = useState(["BINANCE:ETHBTC", "BINANCE:BTCUSDT"]);
  
  let array = []

  useEffect(() => {

    const socket = socketIOClient(ENDPOINT);
    socket.on('userconnected', (event) =>{
      
      const socket = new WebSocket('wss://ws.finnhub.io?token=bsieu5vrh5rd8hs1cbtg');
  
      // Connection opened -> Subscribe
      // Listen for messages
      socket.addEventListener('message', function (event) {

          let stream = JSON.parse(event.data)

          //extracting information from websocket response
          for (let key in stream.data){
                for (let values in stream.data[key]){
          //prepating array with object for chart
               let timeStamp = new Date(stream.data[key].t).toLocaleTimeString("en-US")

                let chartData = {
                        price: stream.data[key].p,
                        // price: Math.floor(Math.random() * 100),

                        trade: timeStamp
                      }
                        array.push(chartData)
                        // setResponse(currentData => [...array])
                        setResponse([...array])

                }

          }
      });

        
     let subscribe = document.getElementById('subscribe')
     let unsubscribe = document.getElementById('unsubscribe')
      
     //ETHBTC
      unsubscribe.addEventListener("click", function(){
        console.log('unsubscribed')
        symbol.map(item=>{
          socket.send(JSON.stringify({'type':'unsubscribe','symbol': item}))

        })


      })

      subscribe.addEventListener("click", function(){
        console.log('subscribed ')
          symbol.map(item=>{
            socket.send(JSON.stringify({'type':'subscribe','symbol': item}))

          })

       })
  })
  return () => socket.disconnect();

  }, []);

  
  let test = symbol.map(item=>{
    return (  
    <LineChart width={500} height={300} data={response}>
      <XAxis dataKey="trade"/>
      <YAxis/>
      <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
      <Line type="monotone" dataKey="price" stroke="#8884d8" />
  </LineChart>
  )
  })
 
  return (

    <div>
      <button id = "subscribe" type="button">Subscribe</button>
      <button id = "unsubscribe" type="button"> Unsubscribe</button>
    <div>
    {/* {values()} */}
    {console.log(typeof response, response)}
    </div>
   {test}
    {/* <Chart/> */}
    </div>
  );
}

export default App;