import { useEffect, useState } from "react";
import CourseModal from "../../components/CourseModal";
import AdminLayout from "./AdminLayout";
import axiosConfig from "../../api/axiosConfig";
import { toast } from "react-toastify";
import AccessDeniedCard from "../../components/AccessDeniedCard";
import CourseCard from "../../components/CourseCard";
import CourseTable from "../../components/CourseTable";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [tableCourseData, setTableCourseData] = useState([]);
  const [cardCourseData, setCardCourseData] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const splitData = (data) => {
    if (!data || data.length === 0) return;

    // Sort array descending by createdAt
    const sorted = [...data].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Split top 3 and rest
    setCardCourseData(sorted.slice(0, 3));
    setTableCourseData(sorted.slice(3));
  };

  const handleSubmit = async (data) => {
    console.log(data);

    try {
      const token = localStorage.getItem("token");
      const res = await axiosConfig.post("/api/courses", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        setCourses((prevCourses) => [...prevCourses, res.data]);

        splitData([...courses, res.data]);

        toast.success("Course created successfully!");
      }
    } catch (error) {
      console.log("Error submitting course data:", error);
    }

    setIsOpen(false);
  };

  useEffect(() => {
    const getAllCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosConfig.get("/api/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setCourses(res.data);
          splitData(res.data);
        } else if (res.status === 401) {
          return <AccessDeniedCard />;
        }
      } catch (error) {
        console.log("Error fetching courses:", error);
      }
    };
    getAllCourses();
  }, []);

  return (
    <AdminLayout>
      {/* Create Course Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Courses</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => setIsOpen(true)}
        >
          + Create Course
        </button>
      </div>
      {/* Course Cards (only 3) */}
      {cardCourseData.length > 0 && (
        <CourseCard cardCourseData={cardCourseData} />
      )}
      {/* Table View */}
      {tableCourseData.length > 0 && (
        <CourseTable courseData={tableCourseData} />
      )}
      {/* Course Modal */}
      <CourseModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
      />
    </AdminLayout>
  );
};

export default Courses;
