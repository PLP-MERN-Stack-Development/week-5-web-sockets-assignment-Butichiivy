const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

// Serve the React build
const clientBuildPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientBuildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// WebSocket logic
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join", ({ username, room }) => {
    socket.join(room);
    socket.to(room).emit("receive-message", {
      username: "System",
      message: `${username} joined the chat.`,
    });
  });

  socket.on("send-message", ({ username, message, room }) => {
    socket.to(room).emit("receive-message", { username, message });
  });

  socket.on("typing", ({ username, room }) => {
    socket.to(room).emit("typing", username);
  });

  socket.on("stop-typing", ({ room }) => {
    socket.to(room).emit("stop-typing");
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
