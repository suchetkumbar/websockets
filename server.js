import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket, request) => {
  const ip = request.socket.remoteAddress;

  socket.on("message", (rawData) => {
    const message = rawData.toString();
    console.log(`Message from ${ip}: ${message}`);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Server Broadcast: ${message}`);
      }
    });
  });

  socket.on("error", (err) => {
    console.error(`Error from ${ip}: ${err}`);
  });

  socket.on("close", (code, reason) => {
    console.log(`Connection closed from ${ip}. Code: ${code}, Reason: ${reason}`);
  });
});

console.log("WebSocket server is running on ws://localhost:3000");

/* Client Example (in browser console):
const socket = new WebSocket("ws://localhost:8080");
socket.onmessage = (event) => console.log("Message from server:", event.data);
socket.onopen = () => socket.send("Hello from chrome console");
*/

// wscat -c ws://localhost:8080