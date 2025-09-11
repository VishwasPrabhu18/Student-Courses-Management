import { useEffect, useState } from "react";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import CourseModal from "../../components/CourseModal";
import AdminLayout from "./AdminLayout";
import axiosConfig from "../../api/axiosConfig";
import { formatDate, shortenText } from "../../constants/helperMethods";

const Courses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data) => {
    console.log("Course Data Submitted:", data);

    try {
      const token = localStorage.getItem("token");
      const res = await axiosConfig.post("/api/courses", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Course created successfully:", res.data);
    } catch (error) {
      console.log("Error submitting course data:", error);
    }

    setIsOpen(false);
  };

  const handleView = (id) => {
    navigate(`/admin/courses/${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (confirmDelete) {
      setCourses((prevCourses) => prevCourses.filter((c) => c.id !== id));
      console.log("Deleted course with ID:", id);
    }
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
        setCourses(res.data);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-4"
          >
            <div className="p-4 bg-gray-100 rounded-full">{course.icon}</div>
            <div>
              <Link
                to={`/courses/${course.id}`}
                className="text-lg font-semibold hover:underline"
              >
                {course.name}
              </Link>
              <p className="text-gray-600 text-sm">
                {course.students} Students
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Table View */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Course Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Start Date</th>
              <th className="p-3">End Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c, idx) => (
              <tr
                key={idx * 10}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="p-3">{idx + 1}</td>
                <td className="p-3 font-medium">{shortenText(c.title, 20)}</td>
                <td className="p-3 text-gray-600 truncate wrap-normal">{shortenText(c.description, 20)}</td>
                <td className="p-3">{formatDate(c.startDate)}</td>
                <td className="p-3">{formatDate(c.endDate)}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      c.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => handleView(c.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiEye size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Show message if no courses left */}
        {courses.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No courses available.
          </p>
        )}
      </div>

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
