const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const path = require("path");
const { notFound, errHandler } = require("./middlewares/errorMiddleware");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

/* Deploy */
const __dirnamee = path.resolve();
app.use(express.static(path.join(__dirnamee, "/frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirnamee, "frontend", "build", "index.html"));
});

app.use(notFound);
app.use(errHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Listen on port: ${PORT}`));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(`user joined room ${room}`);
    socket.emit("connected");
  });

  socket.on("new message", (newMessage) => {
    var { chat } = newMessage;
    console.log(`user newMessage ${chat}`);

    if (!chat.users) return console.log("chat.users not definded");

    chat.users.forEach((user) => {
      if (user._id === newMessage.sender._id) return;

      socket.in(user._id).emit("message recived", newMessage);
    });
    console.log(`user newMessage ${newMessage}`);
    socket.emit("connected");
  });
});
