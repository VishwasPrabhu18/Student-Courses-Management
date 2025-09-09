import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center p-4 relative">
        {/* Company Title */}
        <h1 className="text-xl font-bold">Student Course Management</h1>

        {/* Center Menu */}
        <ul className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8 font-medium">
          <li>
            <Link to="/" className="hover:text-yellow-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-yellow-300">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-300">
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Right Login Button */}
        <Link
          to={token ? "/user" : "/login"}
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
