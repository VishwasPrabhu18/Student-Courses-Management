import { useState } from "react";
import CourseModal from "../../components/CourseModal";
import AdminLayout from "./AdminLayout";

const Courses = () => {
  const courses = [
    { id: 1, name: "React Basics", students: 45 },
    { id: 2, name: "Node.js Fundamentals", students: 32 },
    { id: 3, name: "Data Structures in Java", students: 27 },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (data) => {
    console.log("Course Data Submitted:", data);
    setIsOpen(false);
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 mt-16">Courses</h1>
      <div className="mt-10 mb-4 flex justify-end">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => setIsOpen(true)}
        >
          Create Course
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Course Name</th>
              <th className="p-2">Enrolled Students</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-100">
                <td className="p-2">{c.id}</td>
                <td className="p-2">{c.name}</td>
                <td className="p-2">{c.students}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CourseModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleSubmit} />
    </AdminLayout>
  );
};

export default Courses;
