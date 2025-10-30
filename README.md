React User Account Management App


This is a complete, modern React application that provides a full system for user registration, login, and account management. It's built with functional components, React Hooks, and uses the Context API for state management.

This project was built to demonstrate a clean, practical approach to handling authentication and protected routes in a modern React (Vite) application.

🚀 Features
User Registration: Create a new user account.

User Login: Authenticate existing users.

Protected Routes: The account page is only accessible to logged-in users.

Persistent Session: Uses localStorage to keep users logged in after a page refresh.

View & Edit Profile: Users can view their information and update their name.

User Logout: Securely log out and clear the session.

🛠️ Tech Stack
React: (v16+) Using Hooks (useState, useContext, useEffect).

Vite: As the build tool and development server.

React Router (react-router-dom): For all client-side routing.

React Context API: For global authentication state management.

localStorage: For mock database and session persistence.



📁 Project Structure
Here is the key file structure of the application:

my-account-app/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.js   # Protects routes from unauthenticated users
│   │
│   ├── context/
│   │   └── AuthContext.js      # Global state for authentication
│   │
│   ├── pages/
│   │   ├── AccountPage.js      # User's profile page (protected)
│   │   ├── LoginPage.js        # Login form
│   │   └── RegisterPage.js     # Registration form
│   │
│   ├── App.css                 # Main styles
│   ├── App.js                  # Main app component with routes
│   └── index.js                # Entry point for React
│
├── .gitignore
├── index.html                  # Entry point for Vite
├── package.json
└── README.md                   # You are here!
How It Works
Authentication Flow (Context API)
Authentication state (currentUser) and all auth functions (login, register, logout) are managed by the AuthContext (src/context/AuthContext.js).

The <AuthProvider> component wraps the entire application in index.js, making this state available to any component that needs it.

Protected Routes
The ProtectedRoute component (src/components/ProtectedRoute.js) is a wrapper component. It checks the currentUser from the AuthContext.

If a user exists, it renders the children (e.g., <AccountPage />).

If no user exists, it automatically redirects to the /login page.

Data Persistence
This project does not use a real database. All user accounts and the current user's session are stored in the browser's localStorage to simulate persistence between page reloads.
