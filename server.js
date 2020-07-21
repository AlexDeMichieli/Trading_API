const express = require('express')
const app = express()
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// const PORT = process.env.PORT || 5000 
// const expressServer = app.listen(PORT, '0.0.0.0', () => {
//     console.log('Server is running on port: ' + PORT)
// });

http.listen(3000, () => {
    console.log('listening on *:3000');
  });

// const io = socketio(expressServer)
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('a user connected');
  });

// //connection main Namespace
// io.on('connect', (socket, req)=>{

//     let auth =   {
//         "endpoint" : "https://paper-api.alpaca.markets",
//         "action": "authenticate",
//         "data": {"key_id": "process.env.API_KEY", 
//         "secret_key": "process.env.API_KEY"}
//     }
//     //If we used IO, then when someone connected everyone on the server would get an updated list
//     socket.emit('auth', auth )
// })

// app.get('/', (req, res) => {
//     res.send('<h1>Hello world</h1>');
//   });