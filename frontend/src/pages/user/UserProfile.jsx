import UserLayout from "./UserLayout";

const UserProfile = () => {
  const user = {
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice@email.com",
    phone: "9876543210",
    joinedDate: "2025-01-15",
    avatar: "https://i.pravatar.cc/150?img=5",
    enrolledCourses: [
      { id: 1, name: "React Basics", status: "Active" },
      { id: 2, name: "Node.js Fundamentals", status: "Completed" },
    ],
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8 mt-12">
        {/* Personal Info */}
        <div className="flex flex-col items-center text-center">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-28 h-28 rounded-full border-4 border-indigo-600 shadow-md"
          />
          <h1 className="text-2xl font-bold mt-4">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-gray-600">{user.email}</p>
          <span className="mt-2 px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
            Student
          </span>
        </div>

        {/* Details */}
        <div className="mt-8 space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Phone</span>
            <span className="text-gray-600">{user.phone}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Joined Date</span>
            <span className="text-gray-600">{user.joinedDate}</span>
          </div>
        </div>

        {/* Enrolled Courses */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Enrolled Courses</h2>
        <ul className="space-y-3">
          {user.enrolledCourses.map((course) => (
            <li
              key={course.id}
              className="flex justify-between p-3 border rounded-lg hover:bg-gray-50"
            >
              <span>{course.name}</span>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  course.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {course.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </UserLayout>
  );
};

export default UserProfile;
