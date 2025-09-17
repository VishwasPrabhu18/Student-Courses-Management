import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosConfig from "../../api/axiosConfig";
import AdminLayout from "./AdminLayout";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { getCourseIcon } from "../../constants/iconConstants";
import LoadingDots from "../../components/LoadingDots";
import CourseModal from "../../components/CourseModal";
import { toast } from "react-toastify";
import ConfirmationModal from "../../components/ConfirmationModal";
import { FiTrash2 } from "react-icons/fi";

const AdminCourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const decodedId = atob(id);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseIcon, setCourseIcon] = useState({ Icon: null });
  const [isOpen, setIsOpen] = useState(false);
  const [courseModalData, setCourseModalData] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState({
    isOpen: false,
    title: "",
    message: "",
    icon: null,
    bgClassName: "",
    courseId: "",
    iconBg: "",
    cardBg: "",
    btnBg: "",
  });

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
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axiosConfig.delete(`/api/courses/${decodedId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        toast.success("Course deleted successfully!");
        setCourse(null);
        navigate("/admin/courses");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setDeleteOpen({ isOpen: false });
    }
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
        <div className="w-full flex items-center justify-between">
          <Link to="/admin/courses" className="flex items-center gap-3 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500">
            <FaArrowLeft />
            <span>Back to Courses</span>
          </Link>
          <div className="flex justify-end gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow"
              onClick={handleEditClick}
            >
              <FaEdit /> Edit
            </button>
            <button
              onClick={() =>
                setDeleteOpen({
                  isOpen: true,
                  title: "Confirm Deletion",
                  message:
                    "Are you sure you want to delete this course?",
                  icon: <FiTrash2 size={18} />,
                  bgClassName: "bg-red-100 text-red-700",
                  iconBg: "bg-red-200 text-red-800",
                  cardBg: "bg-red-50",
                  btnBg: "bg-red-600 hover:bg-red-700 text-white",
                  courseId: decodedId,
                })
              }
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow">
              <FaTrash /> Delete
            </button>
          </div>
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

      <ConfirmationModal
        isOpen={deleteOpen.isOpen}
        title={deleteOpen.title}
        description={deleteOpen.message}
        onOk={handleDelete}
        onCancel={() => setDeleteOpen({ isOpen: false })}
        icon={deleteOpen.icon}
        bgClassName={deleteOpen.bgClassName}
        iconBg={deleteOpen.iconBg}
        cardBg={deleteOpen.cardBg}
        btnBg={deleteOpen.btnBg}
      />
    </AdminLayout>
  );
};

export default AdminCourseDetails;
