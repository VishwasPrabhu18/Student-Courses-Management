import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../api/axiosConfig";

const Register = () => {
  const navigator = useNavigate();

  const [loading, setLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [validationError, setValidationError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterData({ ...registerData, [name]: value });
  };

  const clearData = () => {
    setRegisterData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    });
    setValidationError({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateData()) {
      try {
        setLoading(true);
        const res = await axiosConfig.post("/api/users/register", registerData);
        if (res.status == 201) {
          clearData();
          navigator("/login");
        }
      } catch (error) {
        console.log("Error while registering: " + error);
      } finally {
        setLoading(false);
      }
    }
  };

  const validateData = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (registerData.firstName.length < 3) {
      setValidationError((prev) => ({
        ...prev,
        firstName: "First Name is too short",
      }));
    }

    if (registerData.lastName.length < 3) {
      setValidationError((prev) => ({
        ...prev,
        lastName: "Last Name is too short",
      }));
    }

    if (registerData.email.length === 0) {
      setValidationError((prev) => ({
        ...prev,
        email: "Email is required",
      }));
    }

    if (registerData.phoneNumber.length !== 10) {
      setValidationError((prev) => ({
        ...prev,
        phoneNumber: "Phone number is not valid. 10 digits needed!",
      }));
    }

    if (!passwordRegex.test(registerData.password)) {
      setValidationError((prev) => ({
        ...prev,
        password:
          "Password is too week. Atleas lowercase, uppercase, digit, special chars and total length should be more than 8",
      }));
    }

    if (registerData.confirmPassword.length === 0) {
      setValidationError((prev) => ({
        ...prev,
        confirmPassword: "Confirm Password is required!",
      }));
    }

    if (registerData.password !== registerData.confirmPassword) {
      setValidationError((prev) => ({
        ...prev,
        confirmPassword: "Passwords are not matching!",
      }));
    }

    if (
      validationError.firstName === "" &&
      validationError.lastName === "" &&
      validationError.email === "" &&
      validationError.phoneNumber === "" &&
      validationError.password === "" &&
      validationError.confirmPassword === ""
    ) {
      return true;
    }

    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white-600 to-white-700 flex items-center justify-center px-4 mt-14">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                name="firstName"
                value={registerData.firstName}
                onChange={handleChange}
              />
              <span className="text-red-500 text-sm">
                {validationError.firstName}
              </span>
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                name="lastName"
                value={registerData.lastName}
                onChange={handleChange}
              />
              <span className="text-red-500 text-sm">
                {validationError.lastName}
              </span>
            </div>
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              name="email"
              value={registerData.email}
              onChange={handleChange}
            />
            <span className="text-red-500 text-sm">
              {validationError.email}
            </span>
          </div>
          <div>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              name="phoneNumber"
              value={registerData.phoneNumber}
              onChange={handleChange}
            />
            <span className="text-red-500 text-sm">
              {validationError.phoneNumber}
            </span>
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              name="password"
              value={registerData.password}
              onChange={handleChange}
            />
            <span className="text-red-500 text-sm">
              {validationError.password}
            </span>
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleChange}
            />
            <span className="text-red-500 text-sm">
              {validationError.confirmPassword}
            </span>
          </div>
          <button
            type="submit"
            className={`w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            <ImSpinner2
              className={loading ? "inline-block mr-2 animate-spin" : "hidden"}
            />
            {loading ? "Registering in..." : "Create Account"}
          </button>
        </form>

        {/* Back to Login */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigator("/login")}
            className="text-purple-600 font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
