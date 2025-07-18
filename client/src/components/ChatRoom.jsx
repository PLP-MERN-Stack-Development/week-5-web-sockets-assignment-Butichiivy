import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "../App.css";

const socket = io("http://localhost:5000");

function ChatRoom() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { username, role, room } = state || {};
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (!username || !role || !room) {
      navigate("/");
      return;
    }

    socket.emit("join", { username, role, room });

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("typing", ({ username }) => {
      setTypingUser(username);
      setTimeout(() => setTypingUser(""), 2000);
    });

    return () => {
      socket.off("message");
      socket.off("typing");
    };
  }, [username, role, room, navigate]);

  useEffect(() => {
    // Always scroll to the latest message
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chatMessage", { username, role, room, text: message });
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
    else socket.emit("typing", { username, room });
  };

  const logout = () => navigate("/");

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div>Chronicare Chat – Room: {room}</div>
        <button onClick={logout} style={{ background: "white", color: "#0a726d", border: "1px solid #0a726d", padding: "5px 10px", borderRadius: "8px" }}>
          Logout
        </button>
      </div>

      <div className="chat-body" ref={chatBodyRef}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.username === username ? "self" : ""} ${msg.role}`}
          >
            <strong>{msg.username}:</strong> {msg.text}
          </div>
        ))}
        {typingUser && <div className="typing-indicator">{typingUser} is typing...</div>}
      </div>

      <div className="chat-footer">
        <input
          type="text"
          value={message}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatRoom;
