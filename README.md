# Task Management API (Backend)

A Node.js/Express REST API for a full-stack Task Management application. Provides user authentication (JWT), CRUD operations for tasks, and MongoDB Atlas integration.

## Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation

## Features
- User registration and login
- JWT-based authentication
- Create, read, update, delete tasks
- User-specific task management
- Input validation and error handling

## API Endpoints

### Authentication
- `POST /api/auth/signup` — Register new user
- `POST /api/auth/login` — User login

### Tasks (Protected)
- `GET /api/tasks` — Get all user tasks
- `POST /api/tasks` — Create new task
- `PUT /api/tasks/:id` — Update task
- `DELETE /api/tasks/:id` — Delete task

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment variables**
   - Copy `.env.example` to `.env` and fill in your MongoDB URI and JWT secret.
4. **Start the server**
   ```bash
   npm start
   # or
   node server.js
   ```

## Deployment
- Deploy on [Railway](https://railway.app), [Render](https://render.com), or any Node.js cloud platform.
- Set environment variables in the cloud dashboard.
- Use `0.0.0.0/0` in MongoDB Atlas IP whitelist for public cloud access.

## Project Structure
```
backend/
├── middleware/      # JWT authentication middleware
├── models/          # Mongoose schemas (User, Task)
├── routes/          # API route handlers (auth, tasks)
├── .env             # Environment variables
├── server.js        # Application entry point
└── package.json     # Dependencies and scripts
```

## Author
Satish — Full Stack Developer
