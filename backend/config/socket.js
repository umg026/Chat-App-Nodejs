import {Server} from 'socket.io'
import http from 'http'
import express from 'express';

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors : {
        origin : ["http://localhost:5173"]
    }
})

export function getReciverSocketId( userId){
 return userSocketMap[userId]
}
// used to store online users 
const userSocketMap = {}
io.on("connection", (socket)=>{
    console.log("A user Connected", socket.id);
    const userId = socket.handshake.query.userId;
   if(userId) userSocketMap[userId] = socket.id; 

   // emit for is used to send events to all connected clients
   io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
    // console.log("A user disconnect", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    })
})

io.on("connection", (socket) => {
    // console.log("A user connected", socket.id);
    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
    });
  });
export {io, app, server}