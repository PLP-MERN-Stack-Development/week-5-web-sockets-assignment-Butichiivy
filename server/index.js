const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  socket.on("join", ({ username, role, room }) => {
    socket.join(room);
    io.to(room).emit("message", {
      username: "System",
      role: "system",
      text: `${username} (${role}) joined.`,
    });
  });

  socket.on("chatMessage", ({ username, role, room, text }) => {
    io.to(room).emit("message", { username, role, text });
  });

  socket.on("typing", ({ username, room }) => {
    socket.to(room).emit("typing", { username });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms].filter((r) => r !== socket.id);
    rooms.forEach((room) => {
      io.to(room).emit("message", {
        username: "System",
        role: "system",
        text: `A user has disconnected.`,
      });
    });
  });
});

server.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
