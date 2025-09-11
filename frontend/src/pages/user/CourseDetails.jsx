import { useParams, useNavigate } from "react-router-dom";
import UserLayout from "./UserLayout";

// Example available courses (later you can replace with API)
const availableCourses = [
  {
    id: 1,
    name: "React Basics",
    description: "Learn fundamentals of React and build interactive UIs using hooks, props, and state.",
    instructor: "John Doe",
    startDate: "2025-09-15",
    endDate: "2025-10-15",
    level: "Beginner",
  },
  {
    id: 2,
    name: "Node.js Fundamentals",
    description: "Understand backend development with Node.js, Express, and REST APIs.",
    instructor: "Sarah Lee",
    startDate: "2025-09-20",
    endDate: "2025-10-20",
    level: "Intermediate",
  },
  {
    id: 3,
    name: "Java DSA",
    description: "Master Data Structures and Algorithms with Java, including trees, graphs, and recursion.",
    instructor: "Michael Smith",
    startDate: "2025-09-25",
    endDate: "2025-11-25",
    level: "Advanced",
  },
];

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = availableCourses.find((c) => c.id === parseInt(id));

  if (!course) {
    return (
      <UserLayout>
        <div className="flex justify-center items-center h-screen">
          <h2 className="text-2xl font-bold text-red-600">❌ Course Not Found</h2>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-12">
        {/* Course Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">{course.name}</h1>
        <p className="text-gray-600 mb-6">{course.description}</p>

        {/* Course Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="p-4 border rounded-lg shadow-sm">
            <span className="font-semibold text-gray-700">Instructor: </span>
            {course.instructor}
          </div>
          <div className="p-4 border rounded-lg shadow-sm">
            <span className="font-semibold text-gray-700">Level: </span>
            {course.level}
          </div>
          <div className="p-4 border rounded-lg shadow-sm">
            <span className="font-semibold text-gray-700">Start Date: </span>
            {course.startDate}
          </div>
          <div className="p-4 border rounded-lg shadow-sm">
            <span className="font-semibold text-gray-700">End Date: </span>
            {course.endDate}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => alert(`✅ You have enrolled in ${course.name}`)}
            className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            Confirm Enrollment
          </button>
          <button
            onClick={() => navigate("/user/courses")}
            className="px-5 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition"
          >
            Back to Courses
          </button>
        </div>
      </div>
    </UserLayout>
  );
};

export default CourseDetails;
