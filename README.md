# 🔗 URL Shortener

A modern, full-stack URL shortening application with user authentication, analytics tracking, and a beautiful dark-themed UI.

![URL Shortener](https://img.shields.io/badge/Status-Active-success)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green)
![Node.js](https://img.shields.io/badge/Node.js-18+-blue)
![React](https://img.shields.io/badge/React-18+-61dafb)

## ✨ Features

### Core Functionality
- 🔗 **URL Shortening** - Convert long URLs into short, shareable links
- 📊 **Analytics Dashboard** - Track clicks and view detailed statistics
- 🔐 **User Authentication** - Secure signup/login with JWT and HTTP-only cookies
- 🎨 **Modern Dark UI** - Beautiful gradient-based dark theme with glass morphism
- 📱 **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop

### Technical Features
- 🍪 **Cookie-based Authentication** - Secure session management
- 🔒 **Protected Routes** - Frontend and backend route protection
- 📈 **Click Tracking** - Detailed analytics for each shortened URL
- 🎯 **CORS Enabled** - Cross-origin resource sharing configured
- 🚀 **RESTful API** - Clean and organized API endpoints

## 🛠️ Tech Stack

### Frontend
- **React** 18+ - UI library
- **React Router DOM** - Client-side routing
- **Bootstrap 5** - UI framework
- **Bootstrap Icons** - Icon library
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Cookie-Parser** - Cookie handling
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Url Shortner/
├── url-shortner-frontend/          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── Analytics.jsx      # Analytics component
│   │   ├── pages/
│   │   │   ├── Login.jsx          # Login page
│   │   │   └── Signup.jsx         # Signup page
│   │   ├── utils/
│   │   │   ├── auth.js            # Auth utilities
│   │   │   └── api.js             # Axios instance
│   │   ├── App.jsx                # Main app with routing
│   │   ├── URLShortner.jsx        # Main URL shortener page
│   │   ├── main.jsx               # Entry point
│   │   └── style.css              # Custom styles
│   └── package.json
│
└── URL Shortner backend/           # Express Backend
    ├── controller/
    │   ├── url.js                 # URL controller
    │   └── user.js                # User controller
    ├── middleware/
    │   └── isAuth.js              # Authentication middleware
    ├── models/
    │   ├── url.js                 # URL model
    │   ├── user.js                # User model
    │   └── comments.js            # Comments model
    ├── router/
    │   ├── url.js                 # URL routes
    │   └── user.js                # User routes
    ├── service/
    │   └── auth.js                # JWT service
    ├── connect.js                 # MongoDB connection
    ├── index.js                   # Server entry point
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Installation

#### 1. Clone the repository

#### 2. Backend Setup
```bash
cd "URL Shortner backend"
npm install
```

Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
PORT=8001
```

Update `index.js` with your MongoDB connection string:
```javascript
connectToMongoDB("your_mongodb_connection_string")
```

Start the backend server:
```bash
npm start
# or
nodemon index.js
```

Backend will run on `http://localhost:8001`

#### 3. Frontend Setup
```bash
cd ../url-shortner-frontend
npm install
```

Update API endpoints in frontend files if needed:
- `src/pages/Login.jsx`
- `src/pages/Signup.jsx`
- `src/utils/api.js`

Start the frontend development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/user/signup` | Register new user | ❌ |
| POST | `/user/login` | Login user | ❌ |
| POST | `/user/logout` | Logout user | ✅ |

### URL Management
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/url` | Create short URL | ✅ |
| GET | `/url/:shortId` | Redirect to original URL | ❌ |
| GET | `/url/analytics/:shortId` | Get URL analytics | ✅ |

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String,
  createdAt: Date
}
```

### URL Model
```javascript
{
  shortId: String (unique),
  redirectUrl: String,
  visitHistory: [{
    timestamp: Number,
    _id: ObjectId
  }],
  createdBy: ObjectId (ref: User),
  createdAt: Date
}
```

## 👨‍💻 Author

**Parvam Shah**
- Email: parvashah2121@gmail.com

Made with ❤️ by Parvam Shah
