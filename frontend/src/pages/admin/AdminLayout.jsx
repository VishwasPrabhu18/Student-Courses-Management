import { useNavigate } from "react-router-dom";
import AccessDeniedCard from "../../components/AccessDeniedCard";
import Sidebar from "./Sidebar";
import { useUser } from "../../context/UserContext";

const AdminLayout = ({ children }) => {
  const userData = useUser();
  const token = localStorage.getItem("token");
  const isAdmin =
    token && JSON.parse(atob(token.split(".")[1])).role === "admin";

  const navigate = useNavigate();

  const handleAccessDenied = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (userData?.status === 401) {
    return (
      <AccessDeniedCard
        onBack={handleAccessDenied}
        message="You are not authorized to access this page."
      />
    );
  }

  if (!isAdmin) {
    return <AccessDeniedCard onBack={() => navigate("/")} />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen ml-64">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
