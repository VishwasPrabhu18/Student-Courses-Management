import { useState } from "react";
import UserLayout from "./UserLayout";
import CustomInput from "../../components/CustomInput";
import { ImSpinner2 } from "react-icons/im";
import axiosConfig from "../../api/axiosConfig";
import { toast } from "react-toastify";
import PaymentModal from "../../components/PaymentModal ";

const UserSettings = () => {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const sampleCourse = {
    title: "React Advancement",
    description: "Master advanced React patterns.",
    originalPrice: 2500,
    offeredPrice: 1499,
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(newPass)) {
      toast.error("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
      return false;
    }
    if (newPass !== confirm) {
      toast.error("New password and confirm password do not match.");
      return false;
    }
    return true;
  }

  const handleChangePassword = async () => {
    if (!validatePassword()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axiosConfig.post("/api/users/reset-password", {
        currentPassword: current,
        newPassword: newPass,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        toast.success("Password updated successfully");
        setCurrent("");
        setNewPass("");
        setConfirm("");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      const message = error.response?.data?.message || "Failed to update password";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-8 mt-12">
        <h1 className="text-2xl font-bold mb-6">Change Password</h1>

        <div className="space-y-4">
          <CustomInput
            label="Current Password"
            type="password"
            placeholder="Current Password"
            value={current}
            onChange={(value) => setCurrent(value)}
            disabled={loading}
          />
          <CustomInput
            label="New Password"
            type="password"
            placeholder="New Password"
            value={newPass}
            onChange={(value) => setNewPass(value)}
            disabled={loading}
          />
          <CustomInput
            label="Confirm New Password"
            type="password"
            placeholder="Confirm New Password"
            value={confirm}
            onChange={(value) => setConfirm(value)}
            disabled={loading}
          />

          <button
            onClick={handleChangePassword}
            className={`w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700  ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            <ImSpinner2
              className={loading ? "inline-block mr-2 animate-spin" : "hidden"}
            />
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>

      <div className="p-6">
        <button
          onClick={() => setOpen(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Make Payment
        </button>

        <PaymentModal isOpen={open} onClose={() => setOpen(false)} course={sampleCourse} />
      </div>
    </UserLayout>
  );
};

export default UserSettings;
