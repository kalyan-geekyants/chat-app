import React, { useEffect, useState } from "react";
import "../styles/chat.css";

function Chat({ socket, roomId, user }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
      let newMessage = {
        room: roomId,
        userName: user,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("hello_bot", (data) => {
      if (!messages.length) {
        setMessages((prev) => [...prev, data]);
      }
    });

    socket.on("receive_reply", (data) => {
      console.log(data);
      setMessages((prev) => [...prev, data]);
    });
    return () =>socket.disconnect();
  }, [socket]);

  return (
    <div className="chat-box">
      <div className="chat-header">Chat Bot Assistance</div>{" "}
      <div className="chat-bot-body">
        {messages.map((each, index) => (
          <div
            style={{
              display: "flex",
              justifyContent:
                each.userName === "bot" ? "flex-start" : "flex-end",
              width: "100%",
            }}
            key={index}
          >
            <div
              className={`chat-message-box ${
                each.userName === "bot" ? "bot-chat" : "user-chat"
              } `}
            >
              <p className="chat-user">{each.userName}</p>
              <p className="chat-message">{each.message}</p>
              
              {each.userDetails && <div className="user-details">
                <p className="chat-message"><b>Name</b>: {each.userDetails.name}</p>
                <p className="chat-message"><b>Email</b>: {each.userDetails.email}</p>
                <p className="chat-message"><b>Age</b>: {each.userDetails.age}</p>
              </div>}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={{ display: "flex" }}>
        <input
          type="text"
          onChange={(e) => setCurrentMessage(e.target.value)}
          value={currentMessage}
          className="chat-input"
          placeholder="Enter your message..."
        />  
        <input className="chat-send-button" type="submit" value="send"/>
      </form>
    </div>
  );
}

export default Chat;
