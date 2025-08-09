'use client'

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To check if auth state is loaded

  useEffect(() => {
    // Check local storage for a logged-in user when the app loads
    try {
      const loggedInUser = localStorage.getItem('user');
      if (loggedInUser) {
        setUser(JSON.parse(loggedInUser));
      }
    } catch (error) {
      console.error("Failed to parse user from local storage", error);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const foundUser = storedUsers.find(
        (u) => u.email === email && u.password === password // NOTE: In a real app, passwords would be hashed!
      );

      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const register = (name, email, password) => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = storedUsers.some((u) => u.email === email);

      if (userExists) {
        return false; // User already exists
      }

      const newUser = { name, email, password };
      storedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));
      return true;
    } catch (error) {
      console.error("Registration failed", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const saveTransfer = (transferData) => {
    if (!user) return; // Can't save if not logged in

    try {
      // Get all transfers from local storage
      const allTransfers = JSON.parse(localStorage.getItem('transfers')) || {};
      // Get transfers for the current user (using their email as a key)
      const userTransfers = allTransfers[user.email] || [];
      // Add the new transfer
      userTransfers.push({ ...transferData, id: Date.now(), createdAt: new Date() });
      // Update the user's transfers
      allTransfers[user.email] = userTransfers;
      // Save back to local storage
      localStorage.setItem('transfers', JSON.stringify(allTransfers));
    } catch (error) {
      console.error("Failed to save transfer", error);
    }
  };

  const getTransferHistory = () => {
    if (!user) return [];

    try {
      const allTransfers = JSON.parse(localStorage.getItem('transfers')) || {};
      // Return transfers for the currently logged-in user
      return allTransfers[user.email] || [];
    } catch (error) {
      console.error("Failed to get history", error);
      return [];
    }
  };

  const value = { user, login, logout, register, loading, saveTransfer, getTransferHistory };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}