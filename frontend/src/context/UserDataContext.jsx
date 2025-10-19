import { createContext, useContext, useEffect, useState } from 'react';
import axiosConfig from '../api/axiosConfig';

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [stats, setStats] = useState({
    enrolledCount: 0,
    progressCount: 0,
    completedCount: 0,
    overDueCount: 0,
    certificateCount: 0,
  });
  const [tableData, setTableData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [search, setSearch] = useState("");

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

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axiosConfig.get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setProfileData(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  }

  const getCourses = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axiosConfig.get("/api/users/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      setCourseData(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchProfileData();
      await fetchDashboardData();
      await getCourses();
    };
    fetchData();
  }, []);

  return (
    <UserDataContext.Provider value={{
      profileData, setProfileData,
      stats,
      tableData,
      loading, setLoading,
      courseData, setCourseData,
      search, setSearch,
    }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
