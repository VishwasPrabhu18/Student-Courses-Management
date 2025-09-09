import { BookOpen, UserCheck, Clock, ShieldCheck, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-indigo-700 text-white text-center py-24 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Student Course Management 
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-100">
          Manage your courses, track your progress, and connect with instructors — 
          all in one secure and user-friendly platform.
        </p>
        <button className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition flex items-center mx-auto">
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-12">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          <div className="bg-white p-8 rounded-xl shadow hover:shadow-xl transition">
            <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Course Registration</h3>
            <p className="text-gray-600">
              Easily register and organize courses with a simple interface.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow hover:shadow-xl transition">
            <UserCheck className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Student Profiles</h3>
            <p className="text-gray-600">
              Maintain detailed student records with secure login access.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow hover:shadow-xl transition">
            <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Stay updated with real-time progress tracking and assignments.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 text-center px-6 bg-white">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-8 border rounded-xl shadow-sm hover:shadow-md transition">
            <ShieldCheck className="h-12 w-12 text-blue-700 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Secure & Reliable</h3>
            <p className="text-gray-600 mt-2">
              Advanced security to protect user data and ensure reliability.
            </p>
          </div>
          <div className="p-8 border rounded-xl shadow-sm hover:shadow-md transition">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">User Friendly</h3>
            <p className="text-gray-600 mt-2">
              Clean UI designed for students, teachers, and admins alike.
            </p>
          </div>
          <div className="p-8 border rounded-xl shadow-sm hover:shadow-md transition">
            <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">24/7 Access</h3>
            <p className="text-gray-600 mt-2">
              Access your courses anytime, anywhere, on any device.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-700 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to manage your courses better?
        </h2>
        <p className="text-gray-200 mb-6">
          Join thousands of students and administrators using our system.
        </p>
        <button onClick={() => navigate("/register")} className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition flex items-center mx-auto">
          Create an Account <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </section>
    </div>
  );
}
