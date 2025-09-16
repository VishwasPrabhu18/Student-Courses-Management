import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosConfig from "../../api/axiosConfig";
import AdminLayout from "./AdminLayout";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getCourseIcon } from "../../constants/iconConstants";
import LoadingDots from "../../components/LoadingDots";
import CourseModal from "../../components/CourseModal";
import { toast } from "react-toastify";

const AdminCourseDetails = () => {
  const { id } = useParams();
  const decodedId = atob(id);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseIcon, setCourseIcon] = useState({ Icon: null });
  const [isOpen, setIsOpen] = useState(false);
  const [courseModalData, setCourseModalData] = useState(null);

  const handleSubmit = async (data) => {
    try {
      const { thumbnail, ...updatedData } = data;
      const token = localStorage.getItem("token");
      const res = await axiosConfig.put(`/api/courses/${decodedId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setCourse(res.data);
        setCourseIcon({ Icon: getCourseIcon(res.data.icon) });
        toast.success("Course updated successfully!");
      }
    } catch (error) {
      console.log("Error submitting course data:", error);
    }

    setIsOpen(false);
  };

  useEffect(() => {
    const getCourseById = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const res = await axiosConfig.get(`/api/courses/${decodedId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {          
          setCourse(res.data.data);
          setCourseIcon({ Icon: getCourseIcon(res.data.data.icon) });
        }
      } catch (error) {
        console.log("Error fetching course by ID:", error);
        return null;
      } finally {
        setLoading(false);
      }
    };
    getCourseById();
  }, []);

  const handleEditClick = () => {
    setCourseModalData(course);
    setIsOpen(true);
  }

  if (loading) {
    return (
      <AdminLayout>
        <LoadingDots />
      </AdminLayout>
    );
  }

  if (!course) {
    return (
      <div className="text-center text-gray-500 py-20">
        No course data available.
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow"
            onClick={handleEditClick}
          >
            <FaEdit /> Edit
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow">
            <FaTrash /> Delete
          </button>
        </div>

        {/* Course Header */}
        <div className="flex items-start gap-6 bg-white p-6 rounded-xl shadow">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-40 h-40 object-cover rounded-lg border"
          />
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <div className="p-2 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                {courseIcon.Icon && (
                  <courseIcon.Icon size={24} className="text-white" />
                )}
              </div>
              {course.title}
            </h1>
            <p className="text-gray-600 mt-2">{course.description}</p>
            <div className="mt-3 text-sm text-gray-500 space-x-4">
              <span>
                Instructor: <strong>{course.instructor}</strong>
              </span>
              <span>
                Level:{" "}
                <strong>
                  {course.level[0].toUpperCase() + course.level.slice(1)}
                </strong>
              </span>
              <span>
                Status:{" "}
                <strong>{course.isActive ? "Active ✅" : "Inactive ❌"}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Highlights</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {course.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>

        {/* What You Will Learn */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-2">What You Will Learn</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {course.whatYouLearn.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Requirements</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {course.requirements.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        {/* Course Content */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Course Content</h2>
          <div className="space-y-4">
            {course.courseContent.map((section, i) => (
              <div key={section._id} className="border rounded-md p-3">
                <h3 className="font-medium mb-2">
                  {i + 1}. {section.section}
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  {section.lectures.map((lec) => (
                    <li
                      key={lec._id}
                      className="flex justify-between border-b py-1"
                    >
                      <span>{lec.title}</span>
                      <span className="text-gray-500">{lec.duration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        {/* Pricing */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Pricing</h2>

          {course.offeredPrice > 0 &&
            course.offeredPrice < course.originalPrice ? (
            <>
              <p>
                Original Price:{" "}
                <span className="line-through text-gray-500">
                  ₹{course.originalPrice}
                </span>
              </p>
              <p>
                Offered Price:{" "}
                <span className="font-bold text-green-600">
                  ₹{course.offeredPrice}
                </span>
              </p>
            </>
          ) : (
            <>
              <p>
                Original Price:{" "}
                <span className="font-bold text-green-600">
                  ₹{course.originalPrice}
                </span>
              </p>
              <p>
                Offered Price:{" "}
                <span className="text-gray-500">₹{course.offeredPrice}</span>
              </p>
            </>
          )}
        </div>
      </div>

      <CourseModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        initialData={courseModalData}
        mode="edit"
        cId={decodedId}
      />
    </AdminLayout>
  );
};

export default AdminCourseDetails;
