import UserLayout from "./UserLayout";
import CustomInput from "../../components/CustomInput";
import SearchCourseResults from "../../components/SearchCourseResult";
import axiosConfig from "../../api/axiosConfig";
import LoadingDots from "../../components/LoadingDots";
import { useUserData } from "../../context/UserDataContext";

const UserCourses = () => {
  const { courseData, setCourseData, loading, setLoading, search, setSearch } = useUserData();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosConfig.get(`/api/users/courses?search=${search}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCourseData(res.data);
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <UserLayout>
        <LoadingDots />
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Explore New Courses</h2>
        <div className="flex gap-3">
          <CustomInput
            type="text"
            placeholder="Search for new courses..."
            value={search}
            onChange={(value) => setSearch(value)}
          />
          <button
            onClick={handleSearch}
            className="px-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Search
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
