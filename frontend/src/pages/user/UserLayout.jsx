import { useNavigate } from "react-router-dom";
import AccessDeniedCard from "../../components/AccessDeniedCard";
import UserSidebar from "./UserSidebar";

const UserLayout = ({ children }) => {
  const token = localStorage.getItem("token");
  const isUser = token && JSON.parse(atob(token.split(".")[1])).role === "user";

  const navigate = useNavigate();

  if (!isUser) {
    return <AccessDeniedCard onBack={() => navigate("/")} />;
  }

  return (
    <div className="flex">
      <UserSidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">{children}</main>
    </div>
  );
};

export default UserLayout;
