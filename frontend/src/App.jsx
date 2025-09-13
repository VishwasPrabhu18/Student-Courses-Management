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
import CourseDetails from "./pages/admin/CourseDetails";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminCourseDetails from "./pages/admin/AdminCourseDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
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

        {/* User Routes */}
        <Route path="/user" element={<UserHome />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/courses" element={<UserCourses />} />
        <Route path="/user/settings" element={<UserSettings />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
