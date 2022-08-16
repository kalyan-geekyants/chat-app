import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:4001");

function UserChat() {

  const [show,setShow] = useState(false);
  const [roomId,setRoomId] = useState();
  const [user,setUser] = useState("kk");


  const joinChat = () =>{
    const roomId = Math.random();
    setRoomId(roomId);
    console.log(roomId);
    socket.emit("join_room",roomId);
    setShow(true);
  }


  return (
    <div style={{ padding: "2rem" }}>
      {show? <Chat socket={socket} roomId={roomId} user={user} /> :<button onClick={joinChat}>Chat with Bot</button>}
    </div>
  );
}

export default UserChat;
