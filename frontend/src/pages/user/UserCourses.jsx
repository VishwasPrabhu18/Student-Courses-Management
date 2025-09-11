import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserLayout from "./UserLayout";

const UserCourses = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const availableCourses = [
    { id: 1, name: "React Basics" },
    { id: 2, name: "Node.js Fundamentals" },
    { id: 3, name: "Java DSA" },
  ];

  const filteredCourses = availableCourses.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8 mt-12">
        <h1 className="text-2xl font-bold mb-4">Available Courses</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full border p-2 rounded mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Course List */}
        <ul className="space-y-3">
          {filteredCourses.map((course) => (
            <li
              key={course.id}
              className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50"
            >
              <span>{course.name}</span>
              <button
                onClick={() => navigate(`/user/courses/${course.id}`)}  // ✅ navigate here
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Enroll
              </button>
            </li>
          ))}
        </ul>
      </div>
    </UserLayout>
  );
};

export default UserCourses;
