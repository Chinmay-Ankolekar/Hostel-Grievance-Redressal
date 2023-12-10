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

  const headers = { "content-Type": "application/json" , "Authorization" : authToken }

  return (
    <AuthContext.Provider value={{ authToken, login, logout, headers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
