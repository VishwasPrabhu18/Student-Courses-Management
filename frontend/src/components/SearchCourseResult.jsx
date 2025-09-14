import { Link } from "react-router-dom";
import { shortenText } from "../constants/helperMethods";

const SearchCourseResults = ({ courses }) => {
  if (!courses || courses.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6">
        No courses found.
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
      {courses.map((course, idx) => (
        <div
          key={course._id}
          className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
        >
          {/* Left side */}
          <div className="flex items-center gap-4 min-w-0">
            {/* Index */}
            <span className="text-sm font-medium text-gray-400 shrink-0 w-6 text-center">
              {idx + 1}.
            </span>

            {/* Title & description */}
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-gray-800 truncate">
                {course.title}
              </h3>
              <p className="text-xs text-gray-500 truncate">
                {shortenText(course.description, 100)}
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Price */}
            {course.offeredPrice > 0 &&
              course.offeredPrice < course.originalPrice ? (
              <div className="flex items-center gap-1 text-sm">
                <span className="line-through text-gray-400">
                  ₹{course.originalPrice}
                </span>
                <span className="text-green-600 font-semibold">
                  ₹{course.offeredPrice}
                </span>
              </div>
            ) : (
              <span className="text-green-600 font-semibold text-sm">
                ₹{course.originalPrice}
              </span>
            )}

            {/* Button */}
            <Link
              to={`/user/courses/${btoa(course._id)}`}
              className="px-3 py-1.5 rounded-md text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition"
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchCourseResults;
