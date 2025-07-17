const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Port setup for Render
const PORT = process.env.PORT || 10000;

// ✅ Base route
app.get("/", (req, res) => {
  res.send("Chronicare WebSocket Server Running");
});

// ✅ Socket.io events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Broadcast when a user joins
  socket.on("join", ({ name, doctor }) => {
    console.log(`${name} joined and selected doctor ${doctor}`);
    socket.broadcast.emit("userJoined", { name, doctor });
  });

  // Broadcast messages to all users
  socket.on("sendMessage", ({ name, message, doctor }) => {
    io.emit("receiveMessage", { name, message, doctor });
  });

  // Typing indicator
  socket.on("typing", ({ name }) => {
    socket.broadcast.emit("typing", { name });
  });

  // When a user disconnects
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    socket.broadcast.emit("userLeft");
  });
});

// ✅ Start server
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
