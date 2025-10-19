import { useState } from 'react';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axiosConfig from '../../api/axiosConfig';
import { CheckCircle, Clock } from 'lucide-react';
import { formatDate } from '../../constants/helperMethods';
import AdminLayout from './AdminLayout';

const EnrolledUsers = () => {
  const { id } = useParams();
  const decodedId = atob(id);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchEnrolledUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axiosConfig.get(`/api/admin/courses/${decodedId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          setUsers(res.data);
        }
      } catch (error) {
        console.log("Error fetching enrolled users:", error);
      }
    };
    fetchEnrolledUsers();
  }, [id]);

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold">Enrolled Users</h1>
      </div>
      <div className="py-4">
        <div className="overflow-x-auto rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <table className="min-w-full text-sm text-gray-700 dark:text-gray-200">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">Enrollment Date</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Progress</th>
                <th className="px-6 py-4 text-left">Last Accessed</th>
              </tr>
            </thead>
            <tbody>
              {
                users.length === 0 ? (
                  <tr><td colSpan="7" className="text-center py-4">No users enrolled</td></tr>
                ) : (
                  users.map((item, idx) => {
                    const user = item.userId || {};
                    return (
                      <tr
                        key={idx}
                        className="border-t border-gray-200 dark:border-gray-700"
                      >
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.phoneNumber}</td>
                        <td className="px-6 py-4">
                          {formatDate(item.enrollmentDate)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${item.status === "enrolled"
                              ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                              }`}
                          >
                            {item.status === "enrolled" ? (
                              <CheckCircle size={14} />
                            ) : (
                              <Clock size={14} />
                            )}
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full transition-all"
                              style={{ width: `${item.progress || 0}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 ml-1">
                            {item.progress || 0}%
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {formatDate(item.lastAccessed)}
                        </td>
                      </tr>
                    );
                  }))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}

export default EnrolledUsers