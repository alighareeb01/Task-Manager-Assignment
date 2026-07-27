# Task Manager - MERN Stack Assessment

A full-stack Task Management application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).

The application allows users to securely register, authenticate, and manage their own tasks through a responsive and modern interface.

The project includes:

- JWT Authentication
- Protected Routes
- Full Task CRUD Operations
- Advanced Task Querying
- Request Validation
- Global Error Handling
- Automated API Integration Testing using Jest and Supertest

# Screenshots

## Login

![Login](screenshots/login.png)

## Dashboard

![Dashboard](screenshots/dashboard-one.png)

![Dashboard](screenshots/dashboard-two.png)

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Password hashing using bcrypt
- Protected API routes
- Get current authenticated user
- Authentication middleware

## Task Management

- Create Task
- View all user tasks
- View single task
- Update Task
- Delete Task
- User-specific task ownership

## Task Query Features

- Search tasks by title
- Filter by status
- Filter by priority
- Pagination
- Sorting
- Task statistics

# Frontend Features

- Responsive UI built with Tailwind CSS
- Login page
- Registration page
- Protected Dashboard
- Task creation modal
- Task editing modal
- Search bar
- Status filtering
- Priority filtering
- Pagination with configurable page size
- Loading states
- Error states
- Empty states
- Client-side form validation
- Authentication state management using React Context API

# Backend Features

- REST API architecture
- MVC project structure
- MongoDB Atlas integration
- Mongoose schemas
- JWT authentication
- bcrypt password hashing
- Zod request validation
- Async error handling
- Global error handling middleware
- Protected routes middleware

# Automated Testing

The backend includes API integration testing using:

- Jest
- Supertest
- MongoDB Atlas Test Database

Implemented tests:

## Authentication Tests

- Register a new user
- Login successfully
- Reject incorrect password

## Task Tests

- Create task
- Get all tasks
- Get single task
- Update task
- Delete task

Run all tests:

```bash
npm test
```

Run specific tests:

```bash
npm test auth.test.js

npm test task.test.js
```

# Tech Stack

## Frontend

- React.js
- React Router
- Axios
- Tailwind CSS
- React Context API
- Vite

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- Zod
- Jest
- Supertest

# Project Structure

```
Task-Manager-Assignment
│
├── Backend
│   │
│   ├── src
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── utils
│   │   ├── validations
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── tests
│   │   ├── auth.test.js
│   │   ├── task.test.js
│   │   ├── setup.js
│   │   └── utils
│   │       └── authHelper.js
│   │
│   ├── jest.config.js
│   ├── .env.example
│   └── package.json
│
├── Frontend
│   │
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── layout
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

# Project Structure Explanation

## Backend

### Controllers

Contains application business logic:

- Authentication controllers
- Task controllers

### Models

MongoDB schemas:

- User model
- Task model

### Middleware

Reusable middleware:

- JWT authentication protection
- Validation middleware
- Global error handling

### Routes

API route definitions:

- Authentication routes
- Task routes

### Validations

Zod schemas for:

- Authentication validation
- Task validation

### Utils

Shared utilities:

- JWT generation
- Custom application errors
- Async error handling

## Frontend

### Pages

Application pages:

- Login
- Register
- Dashboard

### Components

Reusable UI components:

- Navbar
- Task cards
- Forms
- Modals

### Context

Global state management:

- Authentication state
- User session handling

# Installation

Clone repository:

```bash
git clone https://github.com/alighareeb01/Task-Manager-Assignment.git
```

Navigate into project:

```bash
cd Task-Manager-Assignment
```

# Backend Setup

Navigate to backend:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000

NODE_ENV=development

DATABASE=your_mongodb_connection_string

TEST_DATABASE=your_test_database_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=30d
```

Run backend:

```bash
npm start
```

Development mode:

```bash
npm run dev
```

Run backend tests:

```bash
npm test
```

# Frontend Setup

Navigate to frontend:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/
```

Run frontend:

```bash
npm run dev
```

# Environment Variables

## Backend

```env
PORT=

NODE_ENV=

DATABASE=

TEST_DATABASE=

JWT_SECRET=

JWT_EXPIRES_IN=
```

## Frontend

```env
VITE_API_URL=
```

# API Endpoints

# Authentication

## Register

```
POST /api/auth/register
```

## Login

```
POST /api/auth/login
```

## Get Current User

```
GET /api/auth/me
```

Requires:

```
Authorization: Bearer <JWT_TOKEN>
```

# Tasks

## Create Task

```
POST /api/tasks
```

## Get All Tasks

```
GET /api/tasks
```

Supported query parameters:

| Parameter | Description        |
| --------- | ------------------ |
| search    | Search task title  |
| status    | Filter by status   |
| priority  | Filter by priority |
| page      | Pagination page    |
| limit     | Number of results  |
| sort      | Sorting            |

Examples:

```
GET /api/tasks?status=Done

GET /api/tasks?priority=High

GET /api/tasks?search=meeting

GET /api/tasks?page=2&limit=5

GET /api/tasks?sort=-createdAt
```

## Get Single Task

```
GET /api/tasks/:id
```

## Update Task

```
PATCH /api/tasks/:id
```

## Delete Task

```
DELETE /api/tasks/:id
```

## Task Statistics

```
GET /api/tasks/stats
```

Returns:

- Total tasks
- Completed tasks
- Pending tasks

# Authentication

All protected endpoints require:

```
Authorization: Bearer <JWT_TOKEN>
```

Each authenticated user can only access and modify their own tasks.

# Completed Features

✅ User Registration

✅ User Login

✅ JWT Authentication

✅ Protected Routes

✅ Password Hashing using bcrypt

✅ Backend Validation

✅ Zod Validation

✅ Global Error Handling

✅ CRUD Operations

✅ Search Tasks

✅ Filter Tasks

✅ Pagination

✅ Sorting

✅ Task Statistics

✅ Responsive UI

✅ Loading States

✅ Error States

✅ Empty States

✅ React Context Authentication

✅ Jest Integration Testing

✅ Supertest API Testing

✅ Separate Testing Database

# Future Improvements

Possible future enhancements:

- Refresh Token Authentication
- Password Reset
- Rate Limiting
- Docker Support
- CI/CD Pipeline
- Swagger API Documentation
- Drag and Drop Task Management
- Task Attachments

# Live Demo

Not deployed yet.

# Development Notes

This project was developed independently as part of a MERN Stack technical assessment.

Resources used:

- Official React Documentation
- Official Express.js Documentation
- MongoDB Documentation
- Mongoose Documentation
- JWT Documentation
- Tailwind CSS Documentation

AI tools (ChatGPT by OpenAI) were used as a productivity and learning assistant for:

- Debugging and troubleshooting
- Code review
- Architecture discussions
- React component organization
- UI improvements
- Testing guidance
- Documentation preparation

All implementation decisions, architecture, and final code were reviewed and understood by the author.

# Author

**Aly Abdullkareem Ahmed**

GitHub:

https://github.com/alighareeb01
