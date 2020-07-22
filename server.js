const express = require('express')
const app = express()
const socketio = require('socket.io')
const Alpaca = require('@alpacahq/alpaca-trade-api')

const PORT = process.env.PORT || 5000 
const expressServer = app.listen(PORT, '0.0.0.0', () => {
    console.log('Server is running on port: ' + PORT)
});

const io = socketio(expressServer)

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket, req) => {
  
  console.log('a user connected', socket.id);
  let key = process.env.API_KEY
  let secret_key = process.env.SECRET_KEY

    const alpaca = new Alpaca({
    keyId: key,
    secretKey: secret_key,
    paper: true,
    usePolygon: false
  })

  alpaca.getAccount().then((account) => {
    socket.emit('Account', account )
  })

  alpaca.lastQuote('AAPL').then((resp) => {
    // console.log(resp)
  });

  const data_client = alpaca.data_ws
  data_client.onConnect(function () {
      console.log("Connected")
      const keys = false ? ['T.FB', 'Q.AAPL', 'A.FB', 'AM.AAPL'] :
          ['alpacadatav1/T.FB', 'alpacadatav1/Q.AAPL', 'alpacadatav1/A.FB', 'alpacadatav1/AM.AAPL']
      data_client.subscribe(keys);

      alpaca.getBars('1Min', ['AAPL', 'TSLA'], {start:'2020-04-20', end:'2020-04-29'}).then((response) => {
        console.log(response)
      })
  })

  data_client.connect()




});






