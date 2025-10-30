import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // 3. Check for user in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // --- Mock Authentication Functions ---

  // Mock Register: Stores user in localStorage
  const register = (email, password, name) => {
    // In a real app, you'd send this to your API
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);

    if (userExists) {
      throw new Error('User already exists');
    }

    const newUser = { email, password, name }; 
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Automatically log in the new user
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setCurrentUser(newUser);
  };

  // Mock Login: Checks user in localStorage
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
    } else {
      throw new Error('Invalid email or password');
    }
  };

  // Logout: Clears user from state and localStorage
  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  // Mock Update: Updates user in localStorage
  const updateUser = (updatedInfo) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...updatedInfo };
    
    // Update in "users" database
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.map(user => 
      user.email === currentUser.email ? updatedUser : user
    );
    localStorage.setItem('users', JSON.stringify(users));

    // Update in "current" session
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
  };

  // 4. Value to be passed to consuming components
  const value = {
    currentUser,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 5. Custom hook to easily use the context
export const useAuth = () => {
  return useContext(AuthContext);
};