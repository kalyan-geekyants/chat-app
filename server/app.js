const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const port = process.env.PORT || 4001;
const {
  validateEmail,
  validateName,
  validateAge,
} = require("./utils/validations");

const app = express();

app.use(cors());
const server = http.createServer(app);

const questions = [
  "",
  "Enter your email",
  "Enter your age",
  "Please confirm your details (yes/no):",
];
const cols = ["name", "email", "age", "confirm"];

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  let details = {};
  let questionNo = 0;
  // console.log("Room Id", socket.id);
  socket.on("join_room", (data) => {
    console.log(`User connected with ID ${data}`);
    // * Joining in a room
    socket.join(data);
    socket.emit("hello_bot", {
      userName: "bot",
      message: "Hi there! I'm here to take details. Please enter your name...",
    });
  });

  socket.on("send_message", (data) => {
    // details += `${data.message} `;
    // questionNo += 1;
    console.log("Message Received", questions[questionNo], details);

    if (cols[questionNo] === "name") {
      if (validateName(data.message)) {
        details[cols[questionNo]] = data.message;
        questionNo++;
        return socket.emit("receive_reply", {
          userName: "bot",
          no: questionNo,
          message: questions[questionNo],
        });
      }
    }
    if (cols[questionNo] === "email") {
      // console.log("Email validated",validateEmail(data.message))
      if (validateEmail(data.message)) {
        details[cols[questionNo]] = data.message;
        questionNo++;
        return socket.emit("receive_reply", {
          userName: "bot",
          no: questionNo,
          message: questions[questionNo],
        });
      } else {
        return socket.emit("receive_reply", {
          userName: "bot",
          no: questionNo,
          message: "Please enter valid email address!",
        });
      }
    }

    if (cols[questionNo] === "age") {
      console.log("Age validated", validateAge(data.message));
      if (validateAge(data.message)) {
        details[cols[questionNo]] = data.message;
        questionNo++;
        return socket.emit("receive_reply", {
          userName: "bot",
          no: questionNo,
          message: questions[questionNo],
          userDetails: details,
        });
      } else {
        return socket.emit("receive_reply", {
          userName: "bot",
          no: questionNo,
          message: "Age should be a number!!",
        });
      }
    }

    if (cols[questionNo] == "confirm") {
      if (data.message == "yes") {
        questionNo = 0;
        details = {};
        socket.emit("receive_reply", {
          userName: "bot",
          no: questionNo,
          message: "Thanks for sharing your details :)",
        });
        socket.emit("hello_bot", {
          userName: "bot",
          message:
            "Hi there! I'm here to take details. Please enter your name...",
        });
      } else if (data.message == "no") {
        details = {};
        questionNo = 0;
        socket.emit("hello_bot", {
          userName: "bot",
          message: "Pleae re-enter your details. Enter your name...",
        });
      } else {
        return socket.emit("receive_reply", {
          userName: "bot",
          no: questionNo,
          message: "We didn't get you. Please confirm (yes/no):",
        });
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
