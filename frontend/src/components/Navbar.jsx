import { Link } from "react-router-dom";
import { NavbarLinks } from "../constants/constants";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const isUser = token && JSON.parse(atob(token.split(".")[1])).role === "user";
  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center p-4 relative">
        {/* Company Title */}
        <h1 className="text-xl font-bold">Student Course Management</h1>

        {/* Center Menu */}
        <ul className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8 font-medium">
          {
            NavbarLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.path} className="hover:text-yellow-300">
                  {link.name}
                </Link>
              </li>
            ))}
        </ul>

        {/* Right Login Button */}
        <Link
          to={token ? isUser ? "/user" : "/admin" : "/login"}
          className={`${
            !token
              ? "bg-yellow-400 text-blue-900 hover:bg-yellow-500"
              : "text-blue-800 bg-gray-200 hover:bg-gray-300"
          } px-4 py-2 rounded-lg font-medium transition`}
        >
          {token ? "Profile" : "Login"}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;