import AdminLayout from "./AdminLayout";
import { Users, BookOpen, Activity } from "lucide-react";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      {/* Dashboard Heading */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Dashboard Overview
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Total Users */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl shadow-lg text-white transition-transform transform hover:scale-105">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Total Users</h2>
            <Users size={32} className="opacity-80" />
          </div>
          <p className="text-4xl font-extrabold mt-4">120</p>
          <p className="text-sm mt-2 opacity-80">+15 this week</p>
        </div>

        {/* Courses */}
        <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-6 rounded-2xl shadow-lg text-white transition-transform transform hover:scale-105">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Courses</h2>
            <BookOpen size={32} className="opacity-80" />
          </div>
          <p className="text-4xl font-extrabold mt-4">15</p>
          <p className="text-sm mt-2 opacity-80">+3 new this month</p>
        </div>

        {/* Active Sessions */}
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-6 rounded-2xl shadow-lg text-white transition-transform transform hover:scale-105">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Active Sessions</h2>
            <Activity size={32} className="opacity-80" />
          </div>
          <p className="text-4xl font-extrabold mt-4">42</p>
          <p className="text-sm mt-2 opacity-80">12 ongoing now</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
