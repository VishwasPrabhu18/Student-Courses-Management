import { useNavigate } from "react-router-dom";
import AccessDeniedCard from "../../components/AccessDeniedCard";
import UserSidebar from "./UserSidebar";
import { useUser } from "../../context/UserContext";
import { useEffect } from "react";
import CustomeLoader from "../../components/CustomeLoader";

const UserLayout = ({ children }) => {
  const { error, loading, fetchUser } = useUser();
  const token = localStorage.getItem("token");
  const isUser = token && JSON.parse(atob(token.split(".")[1])).role === "user";

  const navigate = useNavigate();

  const handleAccessDenied = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchUser();
    }
  }, []);

  if (error?.status === 401) {
    return (
      <AccessDeniedCard
        onBack={handleAccessDenied}
        message="Session expired. Please log in again."
      />
    );
  }

  if (loading) {
    return <CustomeLoader />;
  }

  if (!isUser) {
    return (
      <AccessDeniedCard
        onBack={() => navigate("/")}
        message="You are not authorized to access this page."
      />
    );
  }

  return (
    <div className="flex">
      <UserSidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen ml-64 mt-16">
        {children}
      </main>
    </div>
  );
};

export default UserLayout;
