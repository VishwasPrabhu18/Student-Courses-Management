import { createContext, useContext, useState } from "react";
import axiosConfig from "../api/axiosConfig";
import { toast } from "react-toastify";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axiosConfig.get("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError({ status: 401, message: "Unauthorized" });
        toast.error("Session expired. Please log in again.");
        setTimeout(() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }, 3000);
      } else {
        setError({ status: 500, message: "Server error" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    toast("Logged out successfully", { type: "success" });
    window.location.href = "/login";
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, error, loading, handleLogout, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
