# 🩺 Chronicare Real-Time Chat App

A real-time doctor-patient communication platform built with **React**, **Node.js**, **Express**, **Socket.io**, and **plain CSS**. This app allows patients to select a doctor and chat privately in real time, with typing indicators, login/logout functionality, and beautiful Chronicare styling.

---

## 🔧 Features

- ✅ Patient & Doctor login
- ✅ Doctor selection dropdown
- ✅ Private chat rooms (one-to-one)
- ✅ Real-time messaging via Socket.io
- ✅ Typing indicators ("Someone is typing...")
- ✅ Logout button for both user types
- ✅ Fully styled using plain CSS (no Tailwind or Bootstrap)
- ✅ Designed with Chronicare theme colors
- ✅ Responsive and clean layout

---

## 📷 Screenshots

### 1. Home Page
![Home Page](./assets/home-pg-1.png)

### 2. Doctor Login
![Doctor Login](./assets/doctorlogin.png)

### 3. Patient Login
![Patient Login](./assets/patient-login.png)

### 4. Chat 1 - Room Entry
![Chat Room](./assets/chat1.png)

### 5. Chat 2 - Patient View
![Chat Patient](./assets/chat2-patient.png)

### 6. Chat 3 - Doctor View
![Chat Doctor](./assets/chat3-doctor.png)

---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/PLP-MERN-Stack-Development/week-5-web-sockets-assignment-Butichiivy.git
cd week-5-web-sockets-assignment-Butichiivy
2. Install Server Dependencies
bash
Copy
Edit
cd server
npm install
3. Start the Server
bash
Copy
Edit
node index.js
4. Install Client Dependencies
Open a new terminal:

bash
Copy
Edit
cd client
npm install
5. Start the Frontend (Vite)
bash
Copy
Edit
npm run dev
🛠 Tech Stack
React

Vite

Node.js

Express

Socket.io

Plain CSS

📁 Project Structure
pgsql
Copy
Edit
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx
│   │   │   ├── DoctorLogin.jsx
│   │   │   ├── PatientLogin.jsx
│   │   │   ├── ChatRoom.jsx
│   │   │   └── DoctorSelect.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── App.css
│
├── server/
│   └── index.js
│
├── assets/
│   ├── home-pg-1.png
│   ├── doctorlogin.png
│   ├── patient-login.png
│   ├── chat1.png
│   ├── chat2-patient.png
│   └── chat3-doctor.png
✍️ Author
Butichi Ivy
Power Learn Project – Week 5 WebSocket Assignment