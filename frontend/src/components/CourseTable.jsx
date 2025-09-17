import { courseStatus, formatDate, shortenText } from "../constants/helperMethods";
import { useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";

const CourseTable = ({ courseData, tableHeaders }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-blue-100 to-blue-200 text-left text-gray-700 uppercase text-xs tracking-wider">
            {tableHeaders.map((header) => (
              <th key={header} className="p-3">
                {header}
              </th>
            ))}
            <th className="p-3 rounded-tr-xl">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courseData.length > 0 ? (
            courseData.map((c, idx) => {
              const encodedId = btoa(c._id);
              return (
                <tr
                  key={c.courseId.title}
                  className={`border-b transition duration-150 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100`}
                >
                  <td className="p-3 font-medium">{idx + 1}</td>
                  <td className="p-3 font-semibold">
                    {shortenText(c.courseId.title, 25)}
                  </td>
                  <td className="p-3 text-gray-600 truncate max-w-xs">
                    {shortenText(c.courseId.description, 30)}
                  </td>
                  <td className="p-3">{formatDate(c.enrollmentDate)}</td>
                  <td className="p-3">{formatDate(c.endDate)}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${courseStatus(c.status)}`}
                    >
                      {c.status[0].toUpperCase() + c.status.slice(1).replace("-", " ")}
                    </span>
                  </td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => navigate(`/admin/courses/${encodedId}`)}
                      className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <FiEye size={18} />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-gray-500 py-6">
                No courses available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
