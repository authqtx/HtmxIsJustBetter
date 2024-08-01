// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let userCount = 0;

wss.on('connection', (ws) => {
    userCount++;
    ws.userName = `User${userCount}`;
    console.log(` ${ws.userName} connected`);
    wss.clients.forEach((client) => {
        if (client !== ws) {
            client.send(`${ws.userName} has joined`);
        }
    });

    ws.on('message', (message) => {
        console.log(`Received message from ${ws.userName}: ${message}`);
        wss.clients.forEach((client) => {
            if (client !== ws) {
                client.send(`${ws.userName}: ${message}`);
            } else {
                client.send(`You: ${message}`);
            }
        });
    });

    ws.on('close', () => {
        console.log(`${ws.userName} disconnected`);
        wss.clients.forEach((client) => {
            client.send(`${ws.userName} has left`);
        });
    });
});