import { request } from "http";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port:808}); // Create a WebSocket server on port 8080

// 0 : Connecting
// 1 : Open (safely .send() can be used)
// 2 : Closing
// 3 : Closed

//Connection Event
wss.on('connection',(socket,request)=>{
    const ip = request.socket.remoteAddress;

    socket.on('message',(rawData)=>{
        const message = rawData.toString();
        console.log(`Message from ${ip}: ${message}`);

        wss.clients.forEach((client)=>{
            if(client.readyState === 1){ // make sure communicaition is open
                // or check if client.readyState === WebSocket.OPEN
                client.send(`Serber Broadcast: ${message}`);
            }
        });

    });

    socket.on('error',(err)=>{
        console.error(`Error from ${ip}: ${err}`);
    })

    socket.on('close',(code,reason)=>{
        console.log(`Connection closed from ${ip}. Code: ${code}, Reason: ${reason}`);
    })
});

console.log("WebSocket server is running on ws://localhost:8080");