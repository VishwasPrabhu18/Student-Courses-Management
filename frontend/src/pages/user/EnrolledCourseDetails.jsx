import { useState, useEffect } from "react";
import CourseSidebar from "../../components/userComp/CourseSidebar";
import ProgressBar from "../../components/userComp/ProgressBar";
import LecturePlayer from "../../components/userComp/LecturePlayer";
import UserLayout from "./UserLayout";
import axiosConfig from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { FaAnglesRight } from "react-icons/fa6";
import LoadingDots from "../../components/LoadingDots";
import InactiveCourseCard from "../../components/userComp/InactiveCourseCard";

const EnrolledCourseDetails = () => {
  const { enrollmentId } = useParams();
  const decodedEnrollmentId = atob(enrollmentId);
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        setLoading(true);
        const data = await axiosConfig.get(`/api/users/${decodedEnrollmentId}/enrollment`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCourse(data?.data.course);
        setEnrollment(data?.data.enrollment);
        setCurrentLecture(data?.data.enrollment?.lectureInProgress[0].lectures[0]);

      } catch (err) {
        console.error(err);
        setError("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <UserLayout>
        <LoadingDots />
      </UserLayout>
    );
  }

  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!course || !enrollment) return null;

  if(course.isActive === false) {
    return (
      <UserLayout>
        <InactiveCourseCard />
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`${!sidebarOpen ? "w-0" : "w-72"} border-r bg-gray-50 overflow-y-auto`}>
          <CourseSidebar
            course={course}
            enrollment={enrollment}
            currentLecture={currentLecture}
            setCurrentLecture={setCurrentLecture}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Sticky Header */}
          <div className="p-4 border-b bg-white shadow-sm sticky top-0 z-10">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">{course.title}</h1>
              <div
                className="hover:bg-slate-200 w-10 h-10 p-2 flex items-center justify-center rounded-full cursor-pointer"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <FaAnglesRight className={`transition-transform duration-300 ${sidebarOpen ? "rotate-180" : ""}`} />
              </div>
            </div>
            <p className="text-gray-600">
              Instructor: {course.instructor} • Duration: {course.duration} weeks
            </p>
            <ProgressBar progress={enrollment.progress} />
          </div>

          {/* Lecture Video */}
          <div className="flex-1 overflow-y-auto">
            <LecturePlayer
              lecture={currentLecture}
              courseId={course?._id}
              setEnrollment={setEnrollment}
            />
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default EnrolledCourseDetails;
