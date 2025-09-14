import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../api/axiosConfig";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify";
import CustomInput from "../components/CustomInput";

const Login = () => {
  const navigator = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosConfig.post("/api/users/login", loginData);

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        toast("Logged in successfully", { type: "success" });
        setTimeout(() => {
          navigator("/" + JSON.parse(atob(res.data.token.split(".")[1])).role);
          window.location.reload();
          setLoading(false);

        }, 3000);
      }
    } catch (error) {
      console.log("error while logging: ", error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isLoggedIn = token && JSON.parse(atob(token.split(".")[1])).role;

    if (isLoggedIn) {
      navigator("/" + JSON.parse(atob(token.split(".")[1])).role);
    }
  }, [navigator]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-white-600 to-white-700 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* User Login Form */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          User Login
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <CustomInput
            label="Email"
            type="email"
            placeholder="john@example.com"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={loginData.email}
            onChange={(value) => setLoginData({ ...loginData, email: value })}
          />
          <CustomInput
            label="Password"
            type="password"
            placeholder="*******"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={loginData.password}
            onChange={(value) => setLoginData({ ...loginData, password: value })}
          />
          <button
            type="submit"
            className={`w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={loading}
          >
            <ImSpinner2
              className={loading ? "inline-block mr-2 animate-spin" : "hidden"}
            />
            {loading ? "Logging in..." : "Login"}
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
