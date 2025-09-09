import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { UserSidebarLinks } from "../../constants/constants";
import { useUser } from "../../context/UserContext";

const UserSidebar = () => {
  const userData = useUser();
  const pathname = window.location.pathname;

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="h-screen fixed w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-700 mt-16 flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-gray-800 p-4 flex items-center justify-center">
          <FaUserAlt className="w-8 h-8" />
        </div>
        <h2 className="text-center text-xl font-bold">{ userData.firstName + " " + userData.lastName}</h2>
      </div>

      <nav className="flex-1 p-4 space-y-3">
        {UserSidebarLinks.map((link) => {
          const Icon = link.icon;
          const href = link.path;

          const isActive = pathname === href;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center p-2 gap-2 rounded-md ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              <Icon className="w-5 h-5" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="m-4 flex items-center gap-2 bg-red-600 hover:bg-red-700 p-2 rounded-md"
      >
        <FaSignOutAlt className="w-5 h-5" /> Logout
      </button>
    </div>
  );
};

export default UserSidebar;
