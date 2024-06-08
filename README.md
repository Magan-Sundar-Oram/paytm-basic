# Paytm Basic

Paytm Basic is a simple MERN (MongoDB, Express, React, Node.js) application that allows users to sign up, sign in, view their profile, update their information. This app includes features for sending money to other users.

## Features

- **User Authentication**: Sign up, sign in, and manage sessions securely.
- **Profile Management**: View and update user profile information including username and password.
- **Protected Routes**: Ensure only authenticated users can access certain pages.
- **Responsive Design**: Optimized for both desktop and mobile views.
- **Secure Passwords**: User passwords are hashed using bcrypt.js.
- **JWT Authentication**: JSON Web Tokens are used to ensure users stay logged in across sessions.

## Technology Stack

- **Frontend**:
  - React: JavaScript library for building user interfaces.
  - Tailwind CSS: Utility-first CSS framework for styling.
  - React Router: Declarative routing for React applications.
  - React Toastify: Notification library for React.

- **Backend**:
  - Node.js: JavaScript runtime built on Chrome's V8 engine.
  - Express: Fast, unopinionated, minimalist web framework for Node.js.
  - MongoDB: NoSQL database for storing user and transaction data.
  - Mongoose: MongoDB object modeling tool designed to work in an asynchronous environment.

- **Authentication**:
  - JWT (JSON Web Tokens): For secure user authentication and session management.
  - bcrypt.js: Library for hashing passwords to ensure user data security.

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/magan-sundar-oram/paytm-basic.git
   cd paytm-basic

   ```bash
   cd backend
   npm install
   node index.js

   ```bash
   cd frontend
   npm install
   npm run dev


