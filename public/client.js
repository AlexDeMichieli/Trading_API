const router = require("express").Router();
const WebSocket = require("ws");

const broadcast = (clients, message) => {

    clients.forEach((client) => {

        if (client.readyState === WebSocket.OPEN) {

            client.send(message);
        }
    });
};