// import React, { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authToken, setAuthToken] = useState(localStorage.getItem("jwtToken"));

//   const headers = { "content-Type": "application/json" , "Authorization" : authToken }

//   return (
//     <AuthContext.Provider value={{ authToken, headers }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import { useState } from "react";

export const useAuth = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("jwtToken"));

  const headers = {
    "Content-Type": "application/json",
    "Authorization": authToken
  };

  return { authToken, headers };
};

