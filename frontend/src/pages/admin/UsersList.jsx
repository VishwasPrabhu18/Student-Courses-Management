import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axiosConfig from "../../api/axiosConfig";
import LoadingDots from "../../components/LoadingDots";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popoverUserId, setPopoverUserId] = useState(null);
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
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axiosConfig.get("/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Ensure users is always an array
        if (Array.isArray(res.data)) {
          setUsers(res.data);
        } else if (Array.isArray(res.data?.data)) {
          setUsers(res.data.data);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    getAllStudents();
  }, 
  []);
   
    if (loading) {
    return (
      <AdminLayout>
      <LoadingDots/>
    </AdminLayout>)
  }
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
              <th className="p-3">Role</th>
              <th className="p-3">Enrolled Courses</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((u, idx) => (
              <tr
                key={u._id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="p-3">{idx + 1}</td>
                <td className="p-3 font-medium">{u.firstName}</td>
                <td className="p-3 font-medium">{u.lastName}</td>
                <td className="p-3 text-gray-600">{u.email}</td>
                <td className="p-3 text-gray-700">{u.phone}</td>
                <td className="p-3 text-gray-700">{u.role}</td>
                <td className="p-3 flex items-center gap-2">
                  <span className="font-semibold">{u.enrolledCourses ? u.enrolledCourses.length : 0}</span>
                  {u.enrolledCourses && u.enrolledCourses.length > 0 && (
                    <span
                      className="ml-2 text-indigo-600 hover:text-indigo-800 focus:outline-none cursor-pointer relative"
                      onMouseEnter={() => setPopoverUserId(u._id)}
                      onMouseLeave={() => setPopoverUserId(null)}
                    >
                      {/* Simple eye icon SVG */}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 inline">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M1.5 12s4.5-7.5 10.5-7.5S22.5 12 22.5 12s-4.5 7.5-10.5 7.5S1.5 12 1.5 12z" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={2} />
                      </svg>
                      {popoverUserId === u._id && (
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 min-w-[320px] max-w-[90vw] z-50">
                          <h2 className="text-base font-bold mb-3 text-indigo-700">Enrolled Courses</h2>
                          <ul>
                            {u.enrolledCourses.map((course, i) => (
                              <li
                                key={i}
                                className="mb-2 flex justify-between items-center px-2 py-2 rounded-lg transition-colors hover:bg-indigo-50"
                                style={{whiteSpace: 'nowrap'}}
                              >
                                <span className="font-semibold text-sm text-gray-800">{course.courseTitle}</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${course.status === 'enrolled' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>{course.status.replace(/(?:^|\s|_)([a-z])/g, (m, c) => c.toUpperCase())}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for viewing enrolled courses */}
        {/* Removed modal, now using popover on hover */}
        {/* Removed modal, now using popover on hover */}
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={
              "px-4 py-2 rounded-md " +
              (currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700")
            }
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
            className={
              "px-4 py-2 rounded-md " +
              (currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700")
            }
          >
            Next
          </button>
        </div>
      </div>
    </AdminLayout>

  );
}

export default UsersList;
