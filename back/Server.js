const express = require('express')
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const server = http.createServer(app)

const io = new Server(server,{
    cors : {
        origin : "http://localhost:3000",
        methods : ["GET","POST","PUT","DELETE"]
    }
})


io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room",(data)=>{
        socket.join(data)
        console.log(`User join with user ID : ${socket.id}, room ID : ${data}`)
    })

    socket.on("send_message",(data)=>{
        socket.to(data.roomId).emit("receive_message" , data)
    })
    socket.on("disconnect", () => {
      console.log(`User Disconnected: ${socket.id}`);
    });
  });

server.listen(3001,(err)=>{
    if(err){
        console.log("Error in starting the server")
    }else{
        console.log("Server Started Successfully")
    }
})

