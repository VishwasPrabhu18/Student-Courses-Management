import AdminLayout from "./AdminLayout";

const Courses = () => {
  const courses = [
    { id: 1, name: "React Basics", students: 45 },
    { id: 2, name: "Node.js Fundamentals", students: 32 },
    { id: 3, name: "Data Structures in Java", students: 27 },
  ];

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Courses</h1>
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
    </AdminLayout>
  );
}

export default Courses;
