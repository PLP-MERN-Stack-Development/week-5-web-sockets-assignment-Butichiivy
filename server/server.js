const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let users = [];

io.on("connection", (socket) => {
  console.log("⚡ A user connected:", socket.id);

  socket.on("join", ({ username, role }) => {
    const newUser = { socketId: socket.id, username, role };
    users.push(newUser);
    console.log(`✅ ${username} joined as ${role}`);
    io.emit("users", users);
  });

  socket.on("chat", (msg) => {
    io.emit("chat", msg);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });

  socket.on("consultation_request", ({ from, to, message }) => {
    const doctorSocket = users.find((u) => u.username === to);
    if (doctorSocket) {
      io.to(doctorSocket.socketId).emit("consultation_request", {
        from,
        message,
      });
    }
  });

  socket.on("disconnect", () => {
    users = users.filter((u) => u.socketId !== socket.id);
    io.emit("users", users);
    console.log("❌ A user disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
})