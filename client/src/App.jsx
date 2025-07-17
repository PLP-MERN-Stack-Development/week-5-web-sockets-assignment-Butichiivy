import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://your-backend-url.onrender.com"); // replace with your Render server URL

function App() {
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");

  const doctors = [
    { name: "Dr. Achieng", id: "achieng" },
    { name: "Dr. Kamau", id: "kamau" },
    { name: "Dr. Ouma", id: "ouma" },
  ];

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("typing", (data) => {
      setTypingStatus(data);
      setTimeout(() => setTypingStatus(""), 2000);
    });

    return () => {
      socket.off("message");
      socket.off("typing");
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim().length < 3 || doctor === "") return;

    setIsLoggedIn(true);
    socket.emit("login", { name, doctor });
  };

  const sendMessage = () => {
    if (message.trim() === "") return;
    socket.emit("message", { name, doctor, text: message });
    setMessage("");
  }

  const handleTyping = () => {
    socket.emit("typing", `${name} is typing...`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-black bg-opacity-60 p-6 rounded-xl shadow-lg">
        {!isLoggedIn ? (
          <form onSubmit={handleLogin}>
            <h2 className="text-3xl font-bold text-center mb-6">Welcome to Chronicare</h2>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-4 rounded text-black"
              required
              minLength={3}
            />

            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="w-full p-2 mb-4 rounded text-black"
              required
            >
              <option value="">-- Select your doctor --</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.name}>{doc.name}</option>
              ))}
            </select>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded"
              disabled={name.trim().length < 3 || doctor === ""}
            >
              Join Chat
            </button>
          </form>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Chatting as {name} with {doctor}</h2>

            <div className="h-64 overflow-y-auto bg-white bg-opacity-10 p-3 rounded mb-4">
              {messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <span className="font-semibold">{msg.name}:</span> {msg.text}
                </div>
              ))}
              {typingStatus && <div className="italic text-sm text-gray-300">{typingStatus}</div>}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleTyping}
                className="flex-1 p-2 rounded text-black"
                placeholder="Type your message..."
              />
              <button
                onClick={sendMessage}
                className="bg-purple-600 hover:bg-purple-700 p-2 rounded"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
