<div align="center">

<img src="Frontend/public/Zingle_img1.png" alt="Zingle Banner" width="100%" style="border-radius:12px;" />

<br/>
<br/>

<h1>⚡ Zingle</h1>

<p><strong>Real-time video calls · Instant messaging · Language partner matching</strong></p>

<p>
  <a href="https://zingle-the-calling-and-chatting-app-3tla.onrender.com/" target="_blank">
    <img src="https://img.shields.io/badge/🚀 Live Demo-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" />
  </a>
  &nbsp;
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  &nbsp;
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  &nbsp;
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  &nbsp;
  <img src="https://img.shields.io/badge/Stream-Video+Chat-005FFF?style=for-the-badge&logo=stream&logoColor=white" />
</p>

<p>
  <img src="https://img.shields.io/badge/Made%20in-India%20🇮🇳-FF9933?style=flat-square" />
  &nbsp;
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" />
  &nbsp;
  <img src="https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square" />
</p>

</div>

---

## 📌 What is Zingle?

**Zingle** is a full-stack real-time communication app built for people who want to **talk, connect, and learn languages together**. Think of it as a mashup of WhatsApp's chat experience, Zoom's calling quality, and a language-partner social network — all in one place.

> *"Bas phone uthao & start talking."*

Built with the **MERN stack** and powered by **Stream's Video & Chat SDKs**, Zingle delivers low-latency HD calls, real-time messaging, friend discovery, and a clean onboarding flow — deployed and live on Render.

---

## 🌐 Live Demo

🔗 **[https://zingle-the-calling-and-chatting-app-3tla.onrender.com](https://zingle-the-calling-and-chatting-app-3tla.onrender.com/)**

---

## ✨ Features

### 📹 HD Video & Voice Calling
- Powered by **Stream Video SDK**
- One-click peer-to-peer calls directly from the chat
- In-call controls: mute, camera toggle, end call
- Sub-10ms latency with WebRTC under the hood

### 💬 Real-Time Instant Messaging
- Built on **Stream Chat SDK**
- Live typing indicators & read receipts
- Media & file sharing
- Message history with real-time sync

### 🌍 Language Partner Discovery
- Browse and search recommended users by native/learning language
- Send & accept friend requests
- Live notifications for new connections
- Filter partners by name or language

### 🔐 Authentication
- Email/password signup & login with **JWT**
- **Google OAuth** (one-click sign-in)
- Passwords hashed with **bcryptjs**
- HTTP-only cookies for secure session management

### 🎭 Profile Onboarding
- Upload your own photo **or** generate a random avatar
- Drag-and-drop image upload with live preview
- Set native + learning language for smart matching
- Bio and location fields

### 🔔 Notifications
- Incoming friend requests with one-click accept
- "New Connection" alerts with direct chat shortcut
- Real-time count badge

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + Vite | UI framework & build tool |
| React Router v7 | Client-side routing |
| TanStack Query v5 | Server state, caching, background sync |
| Stream Video React SDK | HD video & voice calling |
| Stream Chat React SDK | Real-time messaging UI |
| Tailwind CSS + DaisyUI | Styling & components |
| Zustand | Theme state management |
| Axios | HTTP client |
| React Hot Toast | Toast notifications |
| Google OAuth (`@react-oauth/google`) | Social login |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| cookie-parser | Secure cookie handling |
| Stream Chat (server SDK) | Chat token generation |
| Google Auth Library | Google OAuth verification |
| dotenv | Environment config |
| cors | Cross-origin requests |

### Infrastructure
| Service | Role |
|---|---|
| Render | Full-stack deployment (frontend + backend) |
| MongoDB Atlas | Cloud database |
| Stream | Video calling & chat infrastructure |

---

## 📁 Project Structure

```
Zingle/
│
├── Frontend/                          # React + Vite app
│   ├── public/
│   │   ├── Zingle_img1.png
│   │   └── Zingle_img2.png
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Sidebar.jsx
│       │   ├── Layout.jsx
│       │   ├── FriendCard.jsx
│       │   ├── CallButton.jsx
│       │   ├── PageLoader.jsx
│       │   ├── ChatLoader.jsx
│       │   ├── NoFriendsFound.jsx
│       │   └── NoNotificationsFound.jsx
│       ├── pages/
│       │   ├── LoginPage.jsx
│       │   ├── SignUpPage.jsx
│       │   ├── OnboardingPage.jsx
│       │   ├── HomePage.jsx
│       │   ├── ChatPage.jsx
│       │   ├── CallPage.jsx
│       │   ├── FriendsPage.jsx
│       │   └── NotificationsPage.jsx
│       ├── hooks/
│       │   ├── useAuthUser.js
│       │   ├── useLogin.js
│       │   ├── useSignUp.js
│       │   └── useLogout.js
│       ├── lib/
│       │   ├── api.js                 # All API calls
│       │   ├── axios.js               # Axios instance
│       │   └── utils.js
│       ├── store/
│       │   └── useThemeStore.js       # Zustand theme store
│       ├── constants/
│       │   └── index.js               # Languages, flags
│       ├── zingle-theme.css           # Custom design system
│       └── App.jsx                    # Routes & auth guard
│
├── Backend/                           # Express API server
│   └── src/
│       ├── controllers/
│       │   ├── auth.controller.js     # Signup, login, Google OAuth, onboarding
│       │   ├── user.controller.js     # Friends, recommendations, requests
│       │   └── chat.controller.js     # Stream token generation
│       ├── models/
│       │   ├── User.js
│       │   └── FriendRequest.js
│       ├── Routes/
│       │   ├── auth.route.js          # /api/auth/*
│       │   ├── users.route.js         # /api/users/*
│       │   └── chat.route.js          # /api/chat/*
│       ├── middleware/
│       │   └── auth.middleware.js     # JWT verification
│       ├── lib/
│       │   ├── database.js            # MongoDB connection
│       │   └── stream.js              # Stream client setup
│       └── server.js                  # Express app entry point
│
└── README.md
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Stream account → [getstream.io](https://getstream.io)
- Google Cloud project with OAuth credentials

### 1. Clone the repo

```bash
git clone https://github.com/your-username/zingle.git
cd zingle
```

### 2. Backend setup

```bash
cd Backend
npm install
```

Create `Backend/.env`:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

GOOGLE_CLIENT_ID=your_google_client_id

NODE_ENV=development
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd Frontend
npm install
```

Create `Frontend/.env`:

```env
VITE_BACKEND_URL=http://localhost:5001/api
VITE_STREAM_API_KEY=your_stream_api_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Start the frontend:

```bash
npm run dev
```

### 4. Open the app

```
http://localhost:5173
```

---

## 🔌 API Routes

### Auth — `/api/auth`
| Method | Route | Description |
|---|---|---|
| `POST` | `/signup` | Register with email & password |
| `POST` | `/login` | Login with email & password |
| `POST` | `/logout` | Clear session cookie |
| `GET` | `/me` | Get current authenticated user |
| `POST` | `/onboarding` | Complete profile setup |
| `POST` | `/google` | Google OAuth login/signup |

### Users — `/api/users`
| Method | Route | Description |
|---|---|---|
| `GET` | `/` | Get recommended users (not friends) |
| `GET` | `/friends` | Get all friends |
| `POST` | `/friend-request/:userId` | Send a friend request |
| `PUT` | `/friend-request/:requestId/accept` | Accept a friend request |
| `GET` | `/friend-requests` | Get incoming + accepted requests |
| `GET` | `/outgoing-friend-requests` | Get sent requests |

### Chat — `/api/chat`
| Method | Route | Description |
|---|---|---|
| `GET` | `/token` | Generate Stream Chat token for current user |

---

## 🗺 App Routes (Frontend)

| Path | Page | Auth Required |
|---|---|---|
| `/login` | Login Page | ❌ |
| `/signup` | Sign Up Page | ❌ |
| `/onboarding` | Profile Setup | ✅ (not onboarded) |
| `/` | Home — Friends + Discover | ✅ |
| `/friends` | Friends List | ✅ |
| `/notifications` | Friend Requests & Alerts | ✅ |
| `/chat/:id` | Chat with a friend | ✅ |
| `/call/:id` | Live video call | ✅ |

---

## 🔮 Roadmap

- [ ] Group video calls (3+ participants)
- [ ] Push notifications (PWA)
- [ ] Message reactions & emoji replies
- [ ] Screen sharing in calls
- [ ] In-app language exercises / flashcards
- [ ] Mobile app (React Native)
- [ ] Dark / light mode toggle
- [ ] WebRTC fallback when Stream is unavailable

---

## 👨‍💻 Developer

**Yash Singh**
Full-Stack Developer · Passionate about real-time systems and great user experiences.

Built with ❤️ in India 🇮🇳

---

<div align="center">

If you found this useful, drop a ⭐ on GitHub — it means a lot!

**Zingle — Connecting People in Real-Time.**

</div>
