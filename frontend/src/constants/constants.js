import { FaBook, FaCog, FaTachometerAlt, FaUsers } from "react-icons/fa";

export const AdminSidebarLinks = [
  { name: "Dashboard", path: "/admin", icon: FaTachometerAlt },
  { name: "Users", path: "/admin/users", icon: FaUsers },
  { name: "Courses", path: "/admin/courses", icon: FaBook },
];

export const UserSidebarLinks = [
  { name: "Dashboard", path: "/user", icon: FaTachometerAlt },
  { name: "Profile", path: "/user/profile", icon: FaUsers },
  { name: "Courses", path: "/user/courses", icon: FaBook },
  { name: "Settings", path: "/user/settings", icon: FaCog }
];