# Chronicare Real-Time Chat App 🩺💬

This is a real-time chat application built with **Socket.io**, **Node.js**, and **React** as part of the PLP MERN Stack Week 5 assignment. It allows doctors and patients to communicate in real time within private chat rooms.

---

## 🚀 Features

- 👨‍⚕️ Doctor/Patient login with role-based flow
- 🧑‍⚕️ Patients can select a doctor to chat with
- 📄 Doctors have their own specific chat rooms
- 🗨️ Real-time private messaging with Socket.io
- ✍️ Typing indicators
- 🔒 Logout functionality
- 🎨 Clean and modern UI using plain CSS
- 🔃 Messages are seen live by both parties across different devices or windows

---

## 📷 Screenshots

| Home Page | Doctor Login | Patient Login |
|-----------|---------------|----------------|
| ![Home](./assets/home-pg-1.png) | ![Doctor Login](./assets/doctorlogin.png) | ![Patient Login](./assets/patient-login.png) |

| Chat Start | Chat as Patient | Chat as Doctor |
|------------|------------------|----------------|
| ![Chat 1](./assets/chat1.png) | ![Chat 2 - Patient](./assets/chat2-patient.png) | ![Chat 3 - Doctor](./assets/chat3-doctor.png) |

---

## 🛠️ Installation & Running Locally

1. **Clone the repository**
   ```
   git clone https://github.com/PLP-MERN-Stack-Development/week-5-web-sockets-assignment-Butichiivy.git
   cd week-5-web-sockets-assignment-Butichiivy

2. **Install dependencies**

For the server:
cd server
npm install

For the client:
cd client
npm install


3. **Start the application**

In server/:
npm start


In client/:
npm run dev


**Folder Structure**

week-5-web-sockets-assignment-Butichiivy/

│
├── client/          # React frontend (Chat interface)
│   └── src/
│       └── components/
│           ├── Login.jsx
│           ├── ChatRoom.jsx
│           └── ...etc
│
├── server/          # Node.js + Express backend with Socket.io
│   └── index.js
│
├── assets/          # Screenshots for documentation
│   ├── home-pg-1.png
│   ├── doctorlogin.png
│   ├── patient-login.png
│   ├── chat1.png
│   ├── chat2-patient.png
│   └── chat3-doctor.png
│
└── README.md        # This file 📄


✅ Assignment Requirements Fulfilled
 Real-time messaging using WebSockets ✅

 Multiple roles (Doctor/Patient) ✅

 Private chat rooms per doctor ✅

 Typing indicator ✅

 Clean user interface ✅

 Screenshot evidence in README ✅

📚 Technologies Used
Frontend: React, CSS

Backend: Node.js, Express, Socket.io

Other tools: VS Code, Git, GitHub

 Author
Ivy Butichi
PLP Web Development Track – MERN Stack