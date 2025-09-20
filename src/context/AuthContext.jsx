import React, { createContext, useState, useEffect } from "react";
import API from "../services/api";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/auth/me")
        .then((res) => setUser(res.data.user))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      return { success: false, msg: err.response?.data?.msg || "Login failed" };
    }
  };

  const signup = async (formData) => {
    try {
      const res = await API.post("/auth/signup", formData);
      const token = res.data.token;
      localStorage.setItem("token", token);
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      return { success: false, msg: err.response?.data?.msg || "Signup failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
