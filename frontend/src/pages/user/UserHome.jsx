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
import CourseTable from "../../components/CourseTable";
import LoadingDots from "../../components/LoadingDots";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <UserLayout>
        <LoadingDots />
      </UserLayout>
    );
  }

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
            icon={<FaHourglassHalf className="text-yellow-500 text-3xl" />}
            label="In Progress Courses"
            value={stats.progressCount}
          />
          <UserDashboardCard
            icon={<FaCheckCircle className="text-green-600 text-3xl" />}
            label="Completed Courses"
            value={stats.completedCount}
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

        {tableData.length > 0 && (
          <CourseTable
            courseData={tableData}
            tableHeaders={[
              "#",
              "Course Name",
              "Description",
              "Start Date",
              "End Date",
              "Status",
            ]}
          />
        )}
      </div>
    </UserLayout>
  );
};

export default UserHome;
