import React, { createContext, useContext, useState, useEffect } from "react";
import { toastStyleError } from "../utils/axiosInstance";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    const handleForceLogout = (e) => {
      logout(e.detail?.message);
    };

    window.addEventListener("force-logout", handleForceLogout);
    return () => window.removeEventListener("force-logout", handleForceLogout);
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      // const tokenExpiry = localStorage.getItem("token_expiry");

      if (token && userStr) {
        setUser(JSON.parse(userStr));
        setIsAuthenticated(true);
      }
    } catch (error) {
      // if (tokenExpiry && Date.now() > parseInt(tokenExpiry)) {
      //   logout();
      // }
      setIsAuthenticated(false);
      console.error("Error checking auth status: ", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    // localStorage.setItem("token_expiry", Date.now() + 3600 * 1000);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    // localStorage.removeItem("token_expiry");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  };

  const updateUser = (updatedUserData) => {
    const newUserData = { ...user, ...updatedUserData };
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
