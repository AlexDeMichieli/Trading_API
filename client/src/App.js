import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Chart from './components/chart'
// import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import '../node_modules/react-vis/dist/style.css';
import {HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
  LineMarkSeries} from 'react-vis';



const ENDPOINT = "localhost:5000";

const App = () => {
  const [response, setResponse] = useState([]);
  let array = []

  useEffect(() => {

    const socket = socketIOClient(ENDPOINT);
    socket.on('userconnected', (event) =>{
  
      const socket = new WebSocket('wss://ws.finnhub.io?token=bsieu5vrh5rd8hs1cbtg');
  
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

          let stream = JSON.parse(event.data)

          //extracting information from websocket response
          for (let key in stream.data){
                for (let values in stream.data[key]){
          //prepating array with object for chart
               let timeStamp = new Date(stream.data[key].t).toLocaleTimeString("en-US")

                let chartData = {
                        x: stream.data[key].p,
                        // price: Math.floor(Math.random() * 100),

                        y: timeStamp
                      }
                        array.push(chartData)
                        setResponse(currentData => [...array])
                        // setResponse([...array])

                }

          }
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

//   const values = () =>{

//     for (let key in response){

//       return(
        
//         <Chart data={response}/>

        
//         //  <div>
//         // <p>price {response[key].p}</p>
//         // <p>symbol {response[key].s}</p>
//         // <p>time {timeStamp}</p>
//         // </div>
      

//         )

//   } 

// }

  return (

    <div>
      <button id = "subscribe" type="button">Subscribe</button>
      <button id = "unsubscribe" type="button"> Unsubscribe</button>
    <div>
    {/* {values()} */}
    {console.log(typeof response, response)}
    </div>
    {/* <LineChart width={500} height={300} data={response}>
        <XAxis dataKey="trade"/>
        <YAxis/>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
    </LineChart> */}
    {/* <Chart/> */}
    {/* <XYPlot width={400} height={300}><XAxis/><YAxis/>
    <HorizontalGridLines />
    <VerticalGridLines />
    <LineMarkSeries data={response} />
    </XYPlot>; */}
    </div>
  );
}

export default App;
