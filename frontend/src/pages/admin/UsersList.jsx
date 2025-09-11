import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axiosConfig from "../../api/axiosConfig";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  useEffect(() => {
    const getAllStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosConfig.get("/api/admin/students", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getAllStudents();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">ID</th>
              <th className="p-3">First Name</th>
              <th className="p-3">Last Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((u, idx) => (
              <tr
                key={u.id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="p-3">{idx + 1}</td>
                <td className="p-3 font-medium">{u.firstName}</td>
                <td className="p-3">{u.lastName}</td>
                <td className="p-3 text-gray-600">{u.email}</td>
                <td className="p-3 text-gray-700">{u.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Previous
          </button>

          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UsersList;
