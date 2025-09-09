import { Target, Eye, Award, Users } from "lucide-react";

export default function About() {
  return (
    <div className="pt-24 px-6 md:px-20 my-10">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
        <p className="mt-4 text-gray-600">
          The Student Course Management System is designed to help students and
          educators manage learning efficiently, with simplicity and flexibility.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="mt-16 grid md:grid-cols-2 gap-8">
        <div className="p-8 bg-white shadow-lg rounded-xl flex flex-col items-center text-center">
          <Target className="w-12 h-12 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          <p className="mt-3 text-gray-600">
            To empower students with a seamless platform that organizes courses,
            simplifies learning, and fosters academic growth.
          </p>
        </div>
        <div className="p-8 bg-white shadow-lg rounded-xl flex flex-col items-center text-center">
          <Eye className="w-12 h-12 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800">Our Vision</h2>
          <p className="mt-3 text-gray-600">
            To be the most trusted digital learning companion, enabling students
            worldwide to achieve their academic goals with confidence.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Why Choose Us?
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-blue-50 rounded-xl shadow text-center">
            <Award className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold">Quality Learning</h3>
            <p className="text-gray-600 mt-2">
              Access structured and reliable course content with ease.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl shadow text-center">
            <Users className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold">Community Support</h3>
            <p className="text-gray-600 mt-2">
              Collaborate with peers and get guidance from educators.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl shadow text-center">
            <Target className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold">Focused Approach</h3>
            <p className="text-gray-600 mt-2">
              Stay on track with organized dashboards and course tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
