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


io.on('connection', (socket, req) => {

  socket.emit('userconnected', socket.id);

})