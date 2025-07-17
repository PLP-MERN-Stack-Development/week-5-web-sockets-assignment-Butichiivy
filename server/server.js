// server/server.js

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // for safety in production, replace with frontend URL
    methods: ["GET", "POST"]
  }
})

io.on("connection", (socket) => {
  console.log("✅ A user connected");

  socket.on("login", ({ name, doctor }) => {
    console.log(`👤 ${name} joined to chat with ${doctor}`);
  });

  socket.on("message", (data) => {
    console.log(`💬 ${data.name}: ${data.text}`);
    io.emit("message", data);
  });

  socket.on("typing", (status) => {
    socket.broadcast.emit("typing", status);
  })

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
