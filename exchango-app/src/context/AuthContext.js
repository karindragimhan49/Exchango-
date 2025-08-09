'use client'

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  // Load user and favorites on initial load
  useEffect(() => {
    try {
      const loggedInUser = localStorage.getItem('user');
      if (loggedInUser) {
        const parsedUser = JSON.parse(loggedInUser);
        setUser(parsedUser);

        const allFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
        setFavorites(allFavorites[parsedUser.email] || []);
      }
    } catch (error) {
      console.error("Failed to parse user or favorites from local storage", error);
    }
    setLoading(false);
  }, []);

  // --------------------
  // AUTH FUNCTIONS
  // --------------------
  const login = (email, password) => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const foundUser = storedUsers.find(
        (u) => u.email === email && u.password === password
      );
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));

        // Load their favorites
        const allFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
        setFavorites(allFavorites[foundUser.email] || []);
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

      if (userExists) return false;

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
    setFavorites([]);
    localStorage.removeItem('user');
  };

  // --------------------
  // FAVORITES FUNCTIONS
  // --------------------
  const addFavorite = (pair) => {
    if (!user) return;
    const newFavorites = [...favorites, pair];
    setFavorites(newFavorites);

    const allFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    allFavorites[user.email] = newFavorites;
    localStorage.setItem('favorites', JSON.stringify(allFavorites));
  };

  const removeFavorite = (pair) => {
    if (!user) return;
    const newFavorites = favorites.filter(
      (fav) => !(fav.from === pair.from && fav.to === pair.to)
    );
    setFavorites(newFavorites);

    const allFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    allFavorites[user.email] = newFavorites;
    localStorage.setItem('favorites', JSON.stringify(allFavorites));
  };

  // --------------------
  // TRANSFER FUNCTIONS
  // --------------------
  const saveTransfer = (transferData) => {
    if (!user) return;

    try {
      const allTransfers = JSON.parse(localStorage.getItem('transfers')) || {};
      const userTransfers = allTransfers[user.email] || [];
      userTransfers.push({ ...transferData, id: Date.now(), createdAt: new Date() });
      allTransfers[user.email] = userTransfers;
      localStorage.setItem('transfers', JSON.stringify(allTransfers));
    } catch (error) {
      console.error("Failed to save transfer", error);
    }
  };

  const getTransferHistory = () => {
    if (!user) return [];
    try {
      const allTransfers = JSON.parse(localStorage.getItem('transfers')) || {};
      return allTransfers[user.email] || [];
    } catch (error) {
      console.error("Failed to get history", error);
      return [];
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    saveTransfer,
    getTransferHistory,
    favorites,
    addFavorite,
    removeFavorite
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
