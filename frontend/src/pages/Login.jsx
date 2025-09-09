import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../api/axiosConfig";

const Login = () => {
  const navigator = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosConfig.post("/api/users/login", loginData);
      
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        if (res.data.user.role === "admin") {
          navigator("/admin");
        } else {
          navigator("/user");
        }
        window.location.reload();
      }
    } catch (error) {
      console.log("error while logging: ", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isLoggedIn = token && JSON.parse(atob(token.split(".")[1])).role;

    if (isLoggedIn) {
      navigator("/" + JSON.parse(atob(token.split(".")[1])).role);
    }
  }, [navigator]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-white-600 to-white-700 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* User Login Form */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          User Login
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            name="email"
            value={loginData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        {/* Switch to Create Account */}
        <p className="text-center text-gray-600 mt-6">
          New User?{" "}
          <button
            onClick={() => navigator("/register")}
            className="text-indigo-600 font-medium hover:underline"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};
export default Login;
