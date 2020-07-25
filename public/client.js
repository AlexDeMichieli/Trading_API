
let subscribe = document.getElementById('subscribe')
let unsubscribe = document.getElementById('unsubscribe')
let active = false

socket.on('userconnected', (event) =>{

    const socket = new WebSocket('wss://ws.finnhub.io?token=');

        socket.addEventListener('open', function (event) {

            // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
        // subscribe.addEventListener("click", function(){
        // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
        // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
        // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
    // });
});
   

    

    // Connection opened -> Subscribe
    
    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
    });
    
    // Unsubscribe
    unsubscribe.addEventListener("click", function(symbol){
        console.log('unsubscribed ')
        active = false
        socket.send(JSON.stringify({'type':'unsubscribe','symbol': "BINANCE:BTCUSDT"}))
    })
    subscribe.addEventListener("click", function(symbol){
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
    })
    
    

})
