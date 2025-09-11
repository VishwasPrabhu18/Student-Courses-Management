import React from "react";
import UserLayout from "./UserLayout";
import { FaBook, FaCheckCircle, FaHourglassHalf, FaCertificate } from "react-icons/fa";

const UserHome = () => {
  const user = {
    firstName: "Alice",
    lastName: "Johnson",
    avatar: "https://i.pravatar.cc/150?img=5",
  };

  const stats = [
    { label: "Enrolled Courses", value: 3, icon: <FaBook className="text-blue-600 text-3xl" /> },
    { label: "Completed", value: 1, icon: <FaCheckCircle className="text-green-600 text-3xl" /> },
    { label: "In Progress", value: 2, icon: <FaHourglassHalf className="text-yellow-500 text-3xl" /> },
    { label: "Certificates", value: 2, icon: <FaCertificate className="text-purple-600 text-3xl" /> },
  ];

  const recentCourses = [
    { id: 1, name: "React Basics", status: "In Progress", start: "2025-01-10", end: "2025-03-10" },
    { id: 2, name: "Node.js Fundamentals", status: "Completed", start: "2025-02-01", end: "2025-04-01" },
    { id: 3, name: "Data Structures in Java", status: "In Progress", start: "2025-01-20", end: "2025-03-20" },
  ];

  return (
    <UserLayout>
      <div className="p-6">
        {/* Dashboard Header */}
        <h1 className="text-3xl font-bold mb-6">Welcome, {user.firstName} 👋</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4">
              <div className="p-4 bg-gray-100 rounded-full">{s.icon}</div>
              <div>
                <p className="text-gray-600">{s.label}</p>
                <h2 className="text-2xl font-bold">{s.value}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Courses Table */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Courses</h2>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">ID</th>
                <th className="p-3">Course Name</th>
                <th className="p-3">Status</th>
                <th className="p-3">Start Date</th>
                <th className="p-3">End Date</th>
              </tr>
            </thead>
            <tbody>
              {recentCourses.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">{c.id}</td>
                  <td className="p-3">{c.name}</td>
                  <td
                    className={`p-3 ${
                      c.status === "Completed"
                        ? "text-green-600"
                        : "text-yellow-600 font-medium"
                    }`}
                  >
                    {c.status}
                  </td>
                  <td className="p-3">{c.start}</td>
                  <td className="p-3">{c.end}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Search & Explore */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Explore New Courses</h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search for new courses..."
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Browse
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserHome;
