# Task Management API

A RESTful API for task management with user authentication built with Node.js, Express, and MongoDB.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Express Validator
- **Password Hashing:** bcryptjs

## Features

- User registration and authentication
- JWT-based authorization
- CRUD operations for tasks
- Task filtering by status
- User-specific task management
- Input validation and error handling

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### Tasks (Protected Routes)
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd task-management-app/backend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables in `.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
```

4. Start the server
```bash
npm start
```

## Deployment

This API can be deployed on Railway, Render, or any Node.js hosting platform.

**Network Considerations:** When deployed to public cloud platforms, the API will have access to MongoDB Atlas from any network since cloud providers have different IP ranges that are automatically whitelisted or you can use 0.0.0.0/0 for public access.

## Project Structure

```
backend/
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── models/
│   ├── User.js          # User schema
│   └── Task.js          # Task schema
├── routes/
│   ├── auth.js          # Authentication routes
│   └── tasks.js         # Task CRUD routes
├── .env                 # Environment variables
├── server.js            # Application entry point
└── package.json         # Dependencies and scripts
```

## Author

Satish - Full Stack Developer