import { Link } from "react-router-dom";
import { getCourseIcon } from "../constants/iconConstants";
import { LuCircleCheckBig, LuCircleX } from "react-icons/lu";

const CourseCard = ({ cardCourseData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {cardCourseData.map((course) => {
        const IconComponent = getCourseIcon(course.icon);
        const encodedId = btoa(course._id);

        return (
          <div
            key={course.title}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 flex flex-col items-start gap-4 border border-gray-100"
          >
            {/* Icon */}
            <div className="flex items-center gap-4 w-full">
              <div className="p-5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                {IconComponent && (
                  <IconComponent size={28} className="text-white" />
                )}
              </div>
              <div>
                <Link
                  to={`/admin/courses/${encodedId}`}
                  className="block text-xl font-semibold text-gray-800 hover:text-blue-600 hover:underline transition-colors duration-200"
                >
                  {course.title}
                </Link>

                <p className="text-gray-500 mt-1 text-sm">{course.category}</p>
              </div>
            </div>

            {/* Course Info */}
            <div className="flex-1 w-full">
              <p className="text-gray-600 mt-2 text-sm">
                {course.students} Course Fees • ₹{course.offeredPrice === 0 ? course.originalPrice : course.offeredPrice}{" "}
              </p>

              <p className="text-gray-400 mt-1 text-xs">
                Duration: {course.duration} weeks • Starts:{" "}
                {new Date(course.startDate).toLocaleDateString()}
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex items-center justify-between w-full">
              <Link
                to={`/admin/courses/${encodedId}`}
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
              >
                View Course
              </Link>

              <span>
                {
                  course.isActive ? (
                    <span className="flex items-center gap-2 font-bold text-green-500">Active <LuCircleCheckBig className=" w-6 h-6" /></span>
                  ) : (
                    <span className="flex items-center gap-2 font-bold text-red-500">Inactive <LuCircleX className=" w-6 h-6" /></span>
                  )
                }
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseCard;
