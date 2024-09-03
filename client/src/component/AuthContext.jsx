// AuthContext.js
import React, { createContext, useState, useContext } from "react";

// Create context
const AuthContext = createContext();

// Provider component to wrap your application
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing the context
export const useAuth = () => useContext(AuthContext);
