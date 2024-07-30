"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
// Define the port for the WebSocket server
var PORT = 8080;
// Create a new WebSocket server
var wss = new ws_1.Server({ port: PORT });
// Event handler for new connections
wss.on('connection', function (ws) {
    // Event handler for incoming messages
    ws.on('message', function (message) {
        console.log('received: %s', message);
        // Broadcast the message to all connected clients
        wss.clients.forEach(function (client) {
            if (client !== ws && client.readyState === ws_1.default.OPEN) {
                client.send(message);
            }
        });
    });
});
console.log("WebSocket signaling server running on ws://localhost:".concat(PORT));
