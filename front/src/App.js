import React, { useEffect, useState } from "react"
import './App.css';
import io from "socket.io-client"
import { Chat } from "./Chat";

const socket = io.connect("http://localhost:3001")

function App() {
  const [name,setName] = useState("")
  const [room,setRoom] = useState("")

  const joinRoom = () => {
    if(name.trim() !== "" && room.trim() !== ""){
      socket.emit("join_room",room)
    }
  }
  return (
    <div className="App">
      <h3>Join A Chat</h3>
      <input type="text" placeholder="Name" onChange={(e) => {setName(e.target.value)}}/>
      <input type="text" placeholder="Room ID"  onChange={(e) => {setRoom(e.target.value)}}/>
      <button onClick={joinRoom}>Join</button>
      <Chat socket={socket} name={name} room={room}/>
    </div>
  );
}

export default App;


