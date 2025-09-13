import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserLayout from "./UserLayout";
import CustomInput from "../../components/CustomInput";

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
    </UserLayout>
  );
};

export default UserCourses;
