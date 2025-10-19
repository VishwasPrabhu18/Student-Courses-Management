// import { FaRegCircleCheck } from "react-icons/fa6";

// const CourseSidebar = ({
//   course,
//   enrollment,
//   currentLecture,
//   setCurrentLecture,
//   sidebarOpen,
// }) => {
//   return (
//     <div className={`border-r bg-white shadow-sm ${sidebarOpen ? "w-72" : ""} transition-all duration-300 flex flex-col`}>
//       <div className="flex items-center justify-between p-4 border-b">
//         <h2 className="text-lg font-semibold text-gray-700">Course Content</h2>
//       </div>
//       <div className="overflow-y-auto h-[calc(100vh-64px)]">
//         {course.courseContent.map((section, idx) => (
//           <div key={idx} className="p-2">
//             <h3 className="font-semibold text-gray-700">{section.section}</h3>
//             <ul className="ml-2 mt-1 space-y-1">
//               {section.lectures.map((lecture) => (
//                 <li
//                   key={lecture.id}
//                   onClick={() => setCurrentLecture(lecture)}
//                   className={`flex justify-between items-center p-2 rounded cursor-pointer ${currentLecture.id === lecture.id
//                     ? "bg-blue-100"
//                     : "hover:bg-gray-100"
//                     }`}
//                 >
//                   <span>{lecture.title}</span>
//                   {enrollment.completedLectures.includes(lecture.id) && (
//                     <span className="text-green-500 text-sm"><FaRegCircleCheck /></span>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CourseSidebar;

import { FaRegCircleCheck } from "react-icons/fa6";

const CourseSidebar = ({
  course,
  enrollment,
  currentLecture,
  setCurrentLecture,
  sidebarOpen,
}) => {
  return (
    <div
      className={`border-r bg-white shadow-sm ${
        sidebarOpen ? "w-72" : ""
      } transition-all duration-300 flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-700">Course Content</h2>
      </div>

      {/* Sections + Lectures */}
      <div className="overflow-y-auto h-[calc(100vh-64px)]">
        {course.courseContent.map((section, idx) => (
          <div key={section._id || idx} className="p-2">
            <h3 className="font-semibold text-gray-700">{section.section}</h3>
            <ul className="ml-2 mt-1 space-y-1">
              {section.lectures.map((lecture) => (
                <li
                  key={lecture._id}
                  onClick={() => setCurrentLecture(lecture)}
                  className={`flex justify-between items-center p-2 rounded cursor-pointer ${
                    currentLecture?._id === lecture._id
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span>{lecture.title}</span>
                  {enrollment?.completedLectures?.includes(lecture._id) && (
                    <span className="text-green-500 text-sm">
                      <FaRegCircleCheck />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
