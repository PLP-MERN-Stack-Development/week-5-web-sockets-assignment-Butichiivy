import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./ChatRoom.css"; // Optional: If you're styling separately

const socket = io("http://localhost:3000");

function ChatRoom({ username, role }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  useEffect(() => {
    socket.emit("join", { username, role });

    socket.on("chat", (payload) => {
      setMessages((prev) => [...prev, payload]);
    });

    socket.on("users", (onlineUsers) => {
      setUsers(onlineUsers);
    });

    socket.on("consultation_request", (req) => {
      if (role === "doctor") {
        alert(`🆘 Consultation request from patient: ${req.from}`);
      }
    });

    return () => {
      socket.off("chat");
      socket.off("users");
      socket.off("consultation_request");
    };
  }, [username, role]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chat", { username, message });
      setMessage("");
    }
  };

  const requestHelp = () => {
    if (!selectedDoctor) return alert("Please select a doctor first.");
    socket.emit("consultation_request", {
      from: username,
      to: selectedDoctor,
      message: `Patient ${username} needs assistance.`,
    });
  };

  const doctorsOnline = users.filter((u) => u.role === "doctor" && u.username !== username);

  return (
    <div className="chatroom">
      <header>
        <h2>Welcome to Chronicare Live Consult</h2>
        <p>Logged in as: <strong>{username}</strong> ({role})</p>
      </header>

      {role === "patient" && (
        <section className="doctor-help">
          <h3>Request Medical Help</h3>
          <select onChange={(e) => setSelectedDoctor(e.target.value)} defaultValue="">
            <option value="" disabled>Select a doctor</option>
            {doctorsOnline.map((doc) => (
              <option key={doc.socketId} value={doc.username}>{doc.username}</option>
            ))}
          </select>
          <button onClick={requestHelp}>Request Help</button>
        </section>
      )}

      <div className="chat-section">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index}><strong>{msg.username}:</strong> {msg.message}</div>
          ))}
        </div>
        <div className="input">
          <input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
