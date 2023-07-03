import React, { createContext, useContext, useState } from "react";

// Tạo Context cho trạng thái đăng nhập
const AuthContext = createContext();

// Component cha chứa trạng thái đăng nhập và hàm đăng nhập
function AuthProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
