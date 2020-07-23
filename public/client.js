//having this set in the client should allow to select the symbol and subscribe when clicked
//should close the connection and open a new one when clicked
//should emit to the server and the server should emit back to the client ?
socket.on('userconnected', (event)=>{

  const ws = new WebSocket(`wss://ws.finnhub.io?token=bsc3vsfrh5rau11sbktg`);

// // Connection opened -> Subscribe
ws.onopen = (event) => {
  console.log('ws open')
  ws.send(JSON.stringify({'type':'subscribe', 'symbol': 'TSLA'}))
  // ws.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
  // ws.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
};

// // Listen for messages
ws.onmessage = (event) => {
    console.log(event.data)

    //this stopped the straming!!
    ws.send(JSON.stringify({'type':'unsubscribe','symbol': "TSLA"}))

};

ws.onclose = () => {
  ws.send(JSON.stringify({'type':'unsubscribe','symbol': "TSLA"}))
};
// // Unsubscribe
//  let unsubscribe = function(symbol) {
//   ws.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
// }
})
