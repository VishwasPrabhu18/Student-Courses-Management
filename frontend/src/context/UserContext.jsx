import { createContext, useContext, useState, useEffect } from "react";
import axiosConfig from "../api/axiosConfig";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axiosConfig.get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          setUser({status: 401, message: "Unauthorized"});
          return;
        }
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user", err);
        setUser({status: 401, message: "Unauthorized"});
      }
    };

    setTimeout(() => {
      fetchUser();
    }, 1000);
  }, []);

  const handleLogout = () => {
    window.location.href = "/login";
    localStorage.removeItem("token");
    setUser(null);
  };

  return <UserContext.Provider value={{ user, handleLogout }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
