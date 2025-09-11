import { useNavigate } from "react-router-dom";
import AccessDeniedCard from "../../components/AccessDeniedCard";
import Sidebar from "./Sidebar";
import { useUser } from "../../context/UserContext";
import CustomeLoader from "../../components/CustomeLoader";

const AdminLayout = ({ children }) => {
  const { error, loading } = useUser();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const isAdmin =
    token && JSON.parse(atob(token.split(".")[1])).role === "admin";

  const handleAccessDenied = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return <CustomeLoader />
  }

  if (error?.status === 401) {
    return (
      <AccessDeniedCard
        onBack={handleAccessDenied}
        message="Session expired. Please log in again."
      />
    );
  }

  if (!isAdmin) {
    return (
      <AccessDeniedCard
        onBack={() => navigate("/")}
        message="You are not authorized to access this page."
      />
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen ml-64 mt-16">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
