import React from "react";

const UserDashboardCard = ({ icon, label, value }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4">
      <div className="p-4 bg-gray-100 rounded-full">{icon}</div>
      <div>
        <p className="text-gray-600">{label}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
    </div>
  );
};

export default UserDashboardCard;
