import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:3000");

function App() {
  const [username, setUsername] = useState("");
  const [tempUsername, setTempUsername] = useState("");
  const [role, setRole] = useState("patient");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingStatus, setTypingStatus] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("chat", (payload) => {
      setMessages((prev) => [...prev, payload]);
    });

    socket.on("users", (onlineUsers) => {
      setUsers(onlineUsers);
    });

    socket.on("consultation_request", (req) => {
      alert(`📩 Consultation request from ${req.from}`);
    });

    socket.on("typing", (data) => {
      if (data.username !== username) {
        setTypingStatus(`${data.username} is typing...`);
        setTimeout(() => setTypingStatus(""), 1500);
      }
    });

    return () => {
      socket.off("chat");
      socket.off("users");
      socket.off("consultation_request");
      socket.off("typing");
    };
  }, [username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLogin = () => {
    if (tempUsername.trim()) {
      setUsername(tempUsername);
      socket.emit("join", { username: tempUsername, role });
    }
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("chat", { username, message });
    setMessage("");
    setIsTyping(false);
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", { username });
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

  const doctorsOnline = users.filter(
    (u) => u.role === "doctor" && u.username !== username
  );

  return (
    <div className="app-container">
      {!username ? (
        <div className="login">
          <h2>Login to Chronicare</h2>
          <input
            placeholder="Enter your name"
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
          <button onClick={handleLogin}>Join</button>
        </div>
      ) : (
        <div className="chatroom">
          <header>
            <h1>Chronicare Live Consult</h1>
            <p>
              Logged in as: <strong>{username}</strong> ({role})
            </p>
          </header>

          {role === "patient" && (
            <section className="doctor-help">
              <h3>Available Doctors</h3>
              <select
                onChange={(e) => setSelectedDoctor(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Select a doctor
                </option>
                {doctorsOnline.map((doc) => (
                  <option key={doc.socketId} value={doc.username}>
                    {doc.username}
                  </option>
                ))}
              </select>
              <button onClick={requestHelp}>Request Medical Help</button>
            </section>
          )}

          <div className="chat-box">
            <div className="messages">
              {messages.map((msg, index) => (
                <div key={index}>
                  <strong>{msg.username}:</strong> {msg.message}
                </div>
              ))}
              <div ref={messagesEndRef}></div>
              {typingStatus && <p className="typing">{typingStatus}</p>}
            </div>
            <div className="input">
              <input
                placeholder="Type your message"
                value={message}
                onChange={handleTyping}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
