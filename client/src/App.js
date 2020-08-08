  import React, { useState, useEffect } from "react";
  import socketIOClient from "socket.io-client";
  import Chart from './components/chart'
  import Button from '@material-ui/core/Button';
  import { makeStyles } from '@material-ui/core/styles';
  import TimerOffIcon from '@material-ui/icons/TimerOff';
  import SlowMotionVideoIcon from '@material-ui/icons/SlowMotionVideo';
  import Paper from '@material-ui/core/Paper';
  import { Container} from '@material-ui/core';
  import Box from '@material-ui/core/Box';
  import './style.css'


  const ENDPOINT = "localhost:5000";
  
  const App = () => {
    const [response, setResponse] = useState([]);
    const [unsubscribe, setUnsuscribe] = useState(false)
    const [subscribe, setSubscribe] = useState(true)
    const [symbol, setSymbol] = useState({
      coin: "IC MARKETS:1"
    });
    
    let array = []
    let timer = null

    const useStyles = makeStyles((theme) => ({
      button: {
        margin: theme.spacing(1),
        textAlign: "center",
        // display: "block",
        marginTop: '20px'
      },
      box: {
        marginTop: "10px"
      }
    }));
    const classes = useStyles();

  
    useEffect(() => {
    
      const socket = socketIOClient(ENDPOINT);
  
      socket.on('userconnected', (event) =>{
        
        const socket = new WebSocket('wss://ws.finnhub.io?token=bsjfs77rh5rcthrmat10');
    
        // Connection opened -> Subscribe
        // Listen for messages
        socket.addEventListener('message', function (event) {
           
              let stream = JSON.parse(event.data)
  
            //extracting information from websocket response
            for (let key in stream.data){
                  for (let values in stream.data[key]){
            //preparing array with object for chart
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
      
             unsubscribe.addEventListener("click", function(){
              clearInterval(timer);
              setUnsuscribe(false)
              setSubscribe(true)
  
              console.log(`unsubscribed to ${symbol.coin}`)
              socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol.coin}))
            })
      
            subscribe.addEventListener("click", function(){

              //this reduces the array after a certain lenght so the graph doesn't get overcrowded

              let timerLogic = () =>{
                if(array.length > 60){
                  let removed = array.splice(0,40)
                  setResponse([...removed])
                } else {
                  setResponse([...array])
                }
              }
              timer = setInterval(timerLogic, 5000)
            
              setSubscribe(false)
              setUnsuscribe(true)
           
              setTimeout( socket.send(JSON.stringify({'type':'subscribe','symbol': symbol.coin})), 1000)
  
            })
  
        }
  
     })
  
    }, [symbol]);
  
    const onChange = e => {
      const { name, value } = e.target;  
      setSymbol({[name]: value });
      
    };
  
    const charts = () => {
      return (
        <Chart data={response}/>
      )
    }
  
    return (
  
      <Container>
        <Box display="flex" className={classes.box} flexDirection="column" alignItems="center" bgcolor="background.paper">
          <h1 className ='title'>Choose a Currency </h1>
          <label for="symbol"></label>
          {/* https://api.binance.com/api/v3/ticker/price */}
          <select className = 'form' disabled = {!subscribe} onChange={onChange} name="coin"  id="symbol">
            <option value="IC MARKETS:1">IC MARKETS:1</option>
            <option value="BINANCE:ETHBTC">BINANCE:ETHBTC</option>
            <option value="BINANCE:BTCUSDT">BINANCE:BTCUSDT</option>
            <option value="BINANCE:ZRXETH">BINANCE:ZRXETH</option>
          </select>
        </Box>
        <Box display="flex" className={classes.box} flexDirection="row" justifyContent="center" bgcolor="background.paper">
          <Button id = "subscribe" disabled = {!subscribe} variant="contained" color="primary" className={classes.button} startIcon={<SlowMotionVideoIcon />} >
          Subscribe
        </Button>
          <Button id = "unsubscribe" disabled = {!unsubscribe} variant="contained" color="secondary" className={classes.button} startIcon={<TimerOffIcon />} >
          Unsubscribe
        </Button>
       </Box>

      <div>
      {/* https://api.binance.com/api/v3/ticker/price */}
     
      {console.log(typeof response, response)}
      </div>
      {charts()}
      </Container>
    );
  }
  
  export default App;