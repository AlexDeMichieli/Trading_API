const { createServer } = require("http");
const express = require("express");
const WebSocket = require("ws");

const app = express();
app.use(express.json({ extended: false }));
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 5000;
const server = createServer(app);
server.listen(port, () => console.info(`Server running on port: ${port}`));

const webSocketServer = new WebSocket.Server({ server });
webSocketServer.on("connection", (ws) => {

    console.info("Total connected clients:", webSocketServer.clients.size);

    app.locals.clients = webSocketServer.clients;
    ws.on('message', function incoming(data) {
      webSocketServer.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      })
    })
});

