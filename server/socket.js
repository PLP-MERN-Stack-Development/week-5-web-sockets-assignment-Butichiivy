// server/socket.js
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("join", ({ name, room, doctor }) => {
      socket.join(room);
      socket.to(room).emit("message", {
        user: "admin",
        text: `${name} has joined the chat.`,
      });
    });

    socket.on("sendMessage", (message) => {
      const rooms = Array.from(socket.rooms);
      const room = rooms[1]; // rooms[0] is the socket.id
      io.to(room).emit("message", {
        user: socket.id,
        text: message,
      });
    });

    socket.on("typing", ({ name }) => {
      const rooms = Array.from(socket.rooms);
      const room = rooms[1];
      socket.to(room).emit("typing", { name });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
