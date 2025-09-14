import { useNavigate } from "react-router-dom";
import AccessDeniedCard from "../../components/AccessDeniedCard";
import UserSidebar from "./UserSidebar";
import { useUser } from "../../context/UserContext";
import { useEffect } from "react";
import CustomeLoader from "../../components/CustomeLoader";

const UserLayout = ({ children }) => {
  const { loading, fetchUser } = useUser();
  const token = localStorage.getItem("token");
  const isUser = token && JSON.parse(atob(token.split(".")[1])).role === "user";

  const navigate = useNavigate();

  useEffect(() => {
    const mainMethod = async () => {
      if (!token) {
        navigate("/login");
      } else {
        await fetchUser();
      }
    };
    mainMethod();
    window.scrollTo(0, 0);
  }, []);

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
