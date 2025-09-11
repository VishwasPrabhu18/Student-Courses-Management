import { useState } from "react";
import UserLayout from "./UserLayout";

const UserSettings = () => {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleChangePassword = () => {
    if (newPass !== confirm) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
  };

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-8 mt-12">
        <h1 className="text-2xl font-bold mb-6">Change Password</h1>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full border p-2 rounded"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-2 rounded"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full border p-2 rounded"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button
            onClick={handleChangePassword}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Update Password
          </button>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserSettings;
