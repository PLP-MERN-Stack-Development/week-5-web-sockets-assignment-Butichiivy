const socket = io();

let username = '';
let role = '';
let room = '';

function chooseRole(selectedRole) {
  const nameInput = document.getElementById("nameInput").value.trim();
  const selectedDoctor = document.getElementById("doctorSelect").value;

  if (nameInput.length < 2) {
    alert("Please enter a valid name (at least 2 characters).");
    return;
  }

  if (selectedRole === "patient" && !selectedDoctor) {
    alert("Please select a doctor.");
    return;
  }

  username = nameInput;
  role = selectedRole;

  if (role === "patient") {
    room = `${username}-${selectedDoctor}`;
  } else {
    room = null; // doctor will join multiple rooms
  }

  socket.emit("join", { username, role, room });

  document.querySelector(".container").style.display = "none";
  document.getElementById("chatPage").style.display = "block";
  document.getElementById("chatHeader").innerText = `Chat as ${username} (${role})`;
}

socket.on("message", ({ sender, text }) => {
  const msgBox = document.getElementById("messages");
  const msg = document.createElement("p");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  msgBox.appendChild(msg);
  msgBox.scrollTop = msgBox.scrollHeight;
});

function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  if (!text) return;

  socket.emit("chatMessage", { text, room });
  input.value = "";
}
