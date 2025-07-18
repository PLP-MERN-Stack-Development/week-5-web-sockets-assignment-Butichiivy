import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("doctor");
  const [room, setRoom] = useState("room1");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim().length < 2) return;
    navigate("/chat", { state: { username, role, room } });
  };

  const doctorList = [
    { name: "Dr. Smith", room: "room1" },
    { name: "Dr. Amina", room: "room2" },
    { name: "Dr. John", room: "room3" },
  ];

  return (
    <div className="login-container">
      <h2>Welcome to Chronicare Chat</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
        </select>

        {role === "doctor" ? (
          <select value={room} onChange={(e) => setRoom(e.target.value)}>
            {doctorList.map((doc, index) => (
              <option key={index} value={doc.room}>
                {doc.name} ({doc.room})
              </option>
            ))}
          </select>
        ) : (
          <select value={room} onChange={(e) => setRoom(e.target.value)}>
            {doctorList.map((doc, index) => (
              <option key={index} value={doc.room}>
                Chat with {doc.name}
              </option>
            ))}
          </select>
        )}

        <button type="submit">Enter Chat</button>
      </form>
    </div>
  );
};

export default Login;
