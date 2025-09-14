import  { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../api/axiosConfig";
import CustomInput from "../components/CustomInput";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-white-600 to-white-700 flex items-center justify-center px-4 mt-14 py-10">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <CustomInput
                label="First Name"
                type="text"
                placeholder="John"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={registerData.firstName}
                onChange={(value) => setRegisterData({ ...registerData, firstName: value })}
              />
              <span className="text-red-500 text-sm">
                {validationError.firstName}
              </span>
            </div>
            <div>
              <CustomInput
                label="Last Name"
                type="text"
                placeholder="Doe"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={registerData.lastName}
                onChange={(value) => setRegisterData({ ...registerData, lastName: value })}
              />
              <span className="text-red-500 text-sm">
                {validationError.lastName}
              </span>
            </div>
          </div>
          <div>
            <CustomInput
              label="Email"
              type="email"
              placeholder="john@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              value={registerData.email}
              onChange={(value) => setRegisterData({ ...registerData, email: value })}
            />
            <span className="text-red-500 text-sm">
              {validationError.email}
            </span>
          </div>
          <div>
            <CustomInput
              label="Phone Number"
              type="tel"
              placeholder="0123456789"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              value={registerData.phoneNumber}
              onChange={(value) => setRegisterData({ ...registerData, phoneNumber: value })}
            />
            <span className="text-red-500 text-sm">
              {validationError.phoneNumber}
            </span>
          </div>
          <div>
            <CustomInput
              label="Password"
              type="password"
              placeholder="*******"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              value={registerData.password}
              onChange={(value) => setRegisterData({ ...registerData, password: value })}
            />
            <span className="text-red-500 text-sm">
              {validationError.password}
            </span>
          </div>
          <div>
            <CustomInput
              label="Confirm Password"
              type="password"
              placeholder="*******"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              value={registerData.confirmPassword}
              onChange={(value) => setRegisterData({ ...registerData, confirmPassword: value })}
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
