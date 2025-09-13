import UserLayout from "./UserLayout";
import {
  FaBook,
  FaCheckCircle,
  FaHourglassHalf,
  FaCertificate,
  FaRegClock,
} from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";
import axiosConfig from "../../api/axiosConfig";
import UserDashboardCard from "../../components/UserDashboardCard";

const UserHome = () => {
  const { user } = useUser();
  const [stats, setStats] = useState({
    enrolledCount: 0,
    progressCount: 0,
    completedCount: 0,
    overDueCount: 0,
    certificateCount: 0,
  });
  const [tableData, setTableData] = useState([]);

  const recentCourses = [
    {
      id: 1,
      name: "React Basics",
      status: "In Progress",
      start: "2025-01-10",
      end: "2025-03-10",
    },
    {
      id: 2,
      name: "Node.js Fundamentals",
      status: "Completed",
      start: "2025-02-01",
      end: "2025-04-01",
    },
    {
      id: 3,
      name: "Data Structures in Java",
      status: "In Progress",
      start: "2025-01-20",
      end: "2025-03-20",
    },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axiosConfig.get("/api/users/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          const data = res.data;
          setStats({
            enrolledCount: data.enrolledCount,
            progressCount: data.progressCount,
            completedCount: data.completedCount,
            certificateCount: data.certificateCount,
            overDueCount: data.overDueCount,
          });
          setTableData(data.courseData);
        }
      } catch (error) {
        console.log("Dashboard data fetch error: " + error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <UserLayout>
      <div className="p-6">
        {/* Dashboard Header */}
        <h1 className="text-3xl font-bold mb-6">
          Welcome, {user?.firstName} 👋
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <UserDashboardCard
            icon={<FaBook className="text-blue-600 text-3xl" />}
            label="Enrolled Courses"
            value={stats.enrolledCount}
          />
          <UserDashboardCard
            icon={<FaCheckCircle className="text-green-600 text-3xl" />}
            label="Completed Courses"
            value={stats.completedCount}
          />
          <UserDashboardCard
            icon={<FaHourglassHalf className="text-yellow-500 text-3xl" />}
            label="In Progress Courses"
            value={stats.progressCount}
          />
          <UserDashboardCard
            icon={<FaRegClock className="text-purple-600 text-3xl" />}
            label="Overdue Courses"
            value={stats.overDueCount}
          />
          <UserDashboardCard
            icon={<FaCertificate className="text-purple-600 text-3xl" />}
            label="Certificates Earned"
            value={stats.certificateCount}
          />
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
      </div>
    </UserLayout>
  );
};

export default UserHome;
