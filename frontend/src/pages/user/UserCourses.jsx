import { useEffect, useState } from "react";
import UserLayout from "./UserLayout";
import CustomInput from "../../components/CustomInput";
import SearchCourseResults from "../../components/SearchCourseResult";
import axiosConfig from "../../api/axiosConfig";

const UserCourses = () => {
  const [search, setSearch] = useState("");
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
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
      }
    };
    getCourses();
  }, []);

  return (
    <UserLayout>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Explore New Courses</h2>
        <div className="flex gap-3">
          <CustomInput
            type="text"
            placeholder="Search for new courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="px-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Browse
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg mt-6 ">
        <h2 className="text-xl font-semibold mb-4">Search Results</h2>
        <SearchCourseResults courses={courseData.data} />
      </div>
    </UserLayout>
  );
};

export default UserCourses;
