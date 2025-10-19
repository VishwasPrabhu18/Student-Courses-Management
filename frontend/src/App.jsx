import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import UserHome from "./pages/user/UserHome";
import UserProfile from "./pages/user/UserProfile";
import UserCourses from "./pages/user/UserCourses";
import UserSettings from "./pages/user/UserSettings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersList from "./pages/admin/UsersList";
import Courses from "./pages/admin/Courses";
import CourseDetails from "./pages/user/CourseDetails";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminCourseDetails from "./pages/admin/AdminCourseDetails";
import EnrolledCourseDetails from "./pages/user/EnrolledCourseDetails";
import EnrolledUsers from "./pages/admin/EnrolledUsers";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UsersList />} />
        <Route path="/admin/courses" element={<Courses />} />
        <Route path="/admin/courses/:id" element={<AdminCourseDetails />} />
        <Route path="/admin/courses/:id/users" element={<EnrolledUsers />} />

        {/* User Routes */}
        <Route path="/user" element={<UserHome />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/courses" element={<UserCourses />} />
        <Route path="/user/courses/:id" element={<CourseDetails />} />
        <Route path="/user/settings" element={<UserSettings />} />
        <Route path="/user/enroll/:enrollmentId" element={<EnrolledCourseDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
