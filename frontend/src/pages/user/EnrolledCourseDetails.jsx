import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import CourseSidebar from "../../components/userComp/CourseSidebar";
import ProgressBar from "../../components/userComp/ProgressBar";
import LecturePlayer from "../../components/userComp/LecturePlayer";
import NotesPanel from "../../components/userComp/NotesPanel";
import UserLayout from "./UserLayout";
import axiosConfig from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { FaAnglesLeft } from "react-icons/fa6";

const EnrolledCourseDetails = () => {
  const { enrollmentId } = useParams();
  const decodedEnrollmentId = atob(enrollmentId);
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ✅ Fetch course + enrollment
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
        setCurrentLecture(data?.data.course?.courseContent[0].lectures[0]);
      } catch (err) {
        console.error(err);
        setError("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const allLectures = useMemo(
    () => (course ? course.courseContent.flatMap((s) => s.lectures) : []),
    [course]
  );

  // ✅ Update lecture progress (PATCH)
  const handleProgressUpdate = async (lectureId, progress) => {
    try {
      await axios.patch(`/api/enrollments/${courseId}/progress`, {
        lectureId,
        progress,
      });

      setEnrollment((prev) => {
        if (!prev) return prev;
        const updatedLectureProgress = {
          ...prev.lectureProgress,
          [lectureId]: progress,
        };

        const completedLectures = Object.keys(updatedLectureProgress).filter(
          (id) => updatedLectureProgress[id] >= 100
        );

        return {
          ...prev,
          lectureProgress: updatedLectureProgress,
          completedLectures,
          progress: (completedLectures.length / allLectures.length) * 100,
        };
      });
    } catch (err) {
      console.error("Failed to update progress", err);
    }
  };

  // ✅ Mark complete
  const markComplete = (lectureId) => {
    handleProgressUpdate(lectureId, 100);
  };

  // ✅ Add note (POST)
  const addNote = async (lectureId, content) => {
    try {
      const res = await axios.post(`/api/enrollments/${courseId}/notes`, {
        lectureId,
        content,
      });

      setEnrollment((prev) => ({
        ...prev,
        notes: [...prev.notes, res.data], // assuming API returns saved note
      }));
    } catch (err) {
      console.error("Failed to add note", err);
    }
  };

  // ✅ Navigation
  const goToNextLecture = () => {
    const idx = allLectures.findIndex((l) => l.id === currentLecture.id);
    if (idx < allLectures.length - 1) {
      setCurrentLecture(allLectures[idx + 1]);
    }
  };

  const goToPrevLecture = () => {
    const idx = allLectures.findIndex((l) => l.id === currentLecture.id);
    if (idx > 0) {
      setCurrentLecture(allLectures[idx - 1]);
    }
  };

  if (loading) return <div className="p-6">Loading course...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!course || !enrollment) return null;

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
                <FaAnglesLeft className={`transition-transform duration-300 ${sidebarOpen ? "rotate-180" : ""}`} />
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
              // progress={enrollment.lectureInProgress[currentLecture.id] || 0}
              // onProgressChange={(p) =>
              //   handleProgressUpdate(currentLecture.id, p)
              // }
            />

            {/* Notes */}
            <NotesPanel
              lecture={currentLecture}
              notes={enrollment.notes.filter(
                (n) => n.lectureId === currentLecture.id
              )}
              onAddNote={addNote}
            />
          </div>

          {/* Bottom Controls */}
          <div className="p-4 border-t bg-white shadow-sm flex justify-between">
            <button
              onClick={goToPrevLecture}
              disabled={allLectures[0].id === currentLecture.id}
              className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>

            {enrollment.completedLectures.includes(currentLecture.id) ? (
              <button
                disabled
                className="px-6 py-2 rounded bg-green-500 text-white cursor-not-allowed"
              >
                Completed
              </button>
            ) : (
              <button
                onClick={() => markComplete(currentLecture.id)}
                disabled={
                  (enrollment.completedLectures[currentLecture.id] || 0) < 100
                }
                className="px-6 py-2 rounded bg-blue-600 text-white disabled:bg-gray-400"
              >
                Mark as Complete
              </button>
            )}

            <button
              onClick={goToNextLecture}
              disabled={
                allLectures[allLectures.length - 1].id === currentLecture.id
              }
              className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default EnrolledCourseDetails;
