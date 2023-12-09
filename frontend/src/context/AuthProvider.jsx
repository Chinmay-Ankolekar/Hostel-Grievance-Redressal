import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("jwtToken"));

  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem("jwtToken", token);
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("jwtToken");
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
