const express = require('express')
const app = express()
const socketio = require('socket.io')
const WebSocket = require('ws');

const PORT = process.env.PORT || 5000 
const expressServer = app.listen(PORT, '0.0.0.0', () => {
    console.log('Server is running on port: ' + PORT)
});

const io = socketio(expressServer)

app.use(express.static(__dirname + '/public'));
let array = []

io.on('connection', (socket, req) => {

  console.log('a user connected', socket.id);

  const ws = new WebSocket(`wss://ws.finnhub.io?token=`);

// Connection opened -> Subscribe
ws.onopen = (event) => {
  ws.send(JSON.stringify({'type':'subscribe', 'symbol': 'TSLA'}))
  // ws.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
  // ws.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
};

// Listen for messages
ws.onmessage = (event) => {
    array.push(event.data)
    console.log(event.data)
    socket.emit('message',array);
};


// Unsubscribe
 let unsubscribe = function(symbol) {
  ws.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
}

});