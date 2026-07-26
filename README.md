# Task Manager Assignment

A RESTful Task Manager API built with **Node.js**, **Express.js**, **MongoDB Atlas**, and **JWT Authentication**. Users can register, authenticate, and securely manage their own tasks.

---

# Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Get Current User

## Task Management
- Create Task
- Get All Tasks
- Get Single Task
- Update Task
- Delete Task

## Task Query Features
- Filter by Status
- Filter by Priority
- Search by Title
- Pagination
- Sorting

## Error Handling
- Global Error Handler
- Validation Errors
- Duplicate Email Handling
- Invalid MongoDB ID Handling
- Invalid / Expired JWT Handling

---

# Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (jsonwebtoken)
- bcrypt
- validator

---

# Project Structure

```
Backend/
│
├── src/
│   ├── controllers/
│   │     ├── authController.js
│   │     └── taskController.js
│   │
│   ├── middleware/
│   │     └── protect.js
│   │
│   ├── models/
│   │     ├── userModel.js
│   │     └── taskModel.js
│   │
│   ├── routes/
│   │     ├── authRoute.js
│   │     └── taskRoute.js
│   │
│   ├── utils/
│   │     ├── appError.js
│   │     ├── catchAsync.js
│   │     ├── generateToken.js
│   │     └── globalErrorHandler.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env.example
├── package.json
└── README.md
```

---

# Prerequisites

- Node.js (v18 or later recommended)
- npm
- MongoDB Atlas database (or local MongoDB)

---

# Installation

Clone the repository

```bash
git clone https://github.com/alighareeb01/Task-Manager-Assignment.git
```

Navigate to the backend

```bash
cd Task-Manager-Assignment/Backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file using `.env.example`.

Run the server

```bash
npm run start:dev
```

---

# Environment Variables

Create a `.env` file inside the Backend folder.

```
PORT=
NODE_ENV=

DATABASE=

JWT_SECRET=
JWT_EXPIRES_IN=
```

---

# Main API Endpoints

## Authentication

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

### Get Current User

```
GET /api/auth/me
```

Requires:

```
Authorization: Bearer <token>
```

---

## Tasks

### Create Task

```
POST /api/tasks
```

### Get All Tasks

```
GET /api/tasks
```

Supports query parameters:

| Parameter | Description |
|-----------|-------------|
| status | Filter by status |
| priority | Filter by priority |
| search | Search by task title |
| page | Pagination |
| limit | Number of tasks per page |
| sort | Sorting (e.g. `createdAt`, `-createdAt`) |

Examples

```
GET /api/tasks?status=Done

GET /api/tasks?priority=High

GET /api/tasks?priority=Low,Medium

GET /api/tasks?search=meeting

GET /api/tasks?page=2&limit=5

GET /api/tasks?sort=-createdAt
```

### Get Single Task

```
GET /api/tasks/:id
```

### Update Task

```
PATCH /api/tasks/:id
```

### Delete Task

```
DELETE /api/tasks/:id
```

---

# Authentication

Protected endpoints require the following header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# Known Issues / Incomplete Items

The core requirements are implemented.

Potential future improvements include:

- Refresh token authentication
- Password reset via email
- Rate limiting
- Input sanitization
- Unit and integration tests
- Docker support
- API documentation using Swagger/OpenAPI

---

# Live Demo

Not deployed.

---

# Test Account

A reviewer can create an account using the registration endpoint:

```
POST /api/auth/register
```

Or use the following test credentials if already created:

```
Email: reviewer@example.com
Password: Reviewer123
```

*(Update these credentials if you create a dedicated test account before submission.)*

---

# Author

**Aly Abdullkareem Ahmed**

GitHub:
https://github.com/alighareeb01
