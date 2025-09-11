// src/pages/CourseDetails.jsx
import { useParams } from "react-router-dom";
import { useState } from "react";
import { FiCheckCircle, FiPlayCircle, FiChevronDown } from "react-icons/fi";
import AdminLayout from "./AdminLayout";

// Dummy course data for multiple courses
const courses = {
  1: {
    title: "Java Basics",
    subtitle:
      "Learn the fundamentals of Java programming with hands-on examples.",
    includes: [
      "5 hours on-demand video",
      "2 articles",
      "Full lifetime access",
      "Certificate of Completion",
    ],
    learn: [
      "Understand Java syntax",
      "Work with variables and data types",
      "Write conditional statements & loops",
      "Build functions and classes",
      "Error handling",
    ],
    curriculum: [
      {
        title: "Introduction",
        lectures: [
          { title: "Welcome to Java", duration: "3m" },
          { title: "Setup JDK & IDE", duration: "8m" },
        ],
      },
      {
        title: "Java Basics",
        lectures: [
          { title: "Hello World Program", duration: "5m" },
          { title: "Variables & Data Types", duration: "10m" },
        ],
      },
    ],
    requirements: [
      "Basic programming knowledge",
      "Laptop/PC with JDK installed",
    ],
    description:
      "This course introduces you to Java programming basics with examples.",
    price: "Free",
    originalPrice: "₹1,500",
  },
  2: {
    title: "React Frontend",
    subtitle:
      "Learn React, JSX, Components, and Hooks with practical projects.",
    includes: [
      "10 hours on-demand video",
      "3 projects",
      "Certificate of Completion",
    ],
    learn: [
      "Understand JSX",
      "Use React hooks",
      "Build components",
      "Manage state effectively",
    ],
    curriculum: [
      {
        title: "React Setup",
        lectures: [
          { title: "Create React App", duration: "5m" },
          { title: "JSX Basics", duration: "12m" },
        ],
      },
    ],
    requirements: ["JavaScript basics", "Node.js installed"],
    description: "Step into modern frontend development with React.",
    price: "Free",
    originalPrice: "₹1,800",
  },
  // Add Node.js, Python, SQL similarly...
};

const CourseDetails = () => {
  const { id } = useParams();
  const course = courses[id] || courses[1]; // fallback to Java if id not found
  const [expandedSection, setExpandedSection] = useState(null);

  return (
    <AdminLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* ✅ Title always visible below navbar */}
        <div className="px-6 py-6 border-b bg-white shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900">{course.title}</h1>
          <p className="text-lg text-gray-700 mt-2">{course.subtitle}</p>
        </div>

        <div className="flex flex-col lg:flex-row px-6 pt-8">
          {/* LEFT SIDE CONTENT */}
          <div className="flex-1 lg:pr-10">
            {/* What you'll learn */}
            <section className="bg-white p-6 rounded-2xl shadow-md mb-6">
              <h2 className="text-2xl font-semibold mb-4">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.learn.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <FiCheckCircle className="text-green-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Course Content */}
            <section className="bg-white p-6 rounded-2xl shadow-md mb-6">
              <h2 className="text-2xl font-semibold mb-4">Course content</h2>
              {course.curriculum.map((section, i) => (
                <div key={i} className="mb-4 border rounded-lg">
                  <button
                    className="flex justify-between items-center w-full px-4 py-3 font-semibold text-left hover:bg-gray-50"
                    onClick={() =>
                      setExpandedSection(expandedSection === i ? null : i)
                    }
                  >
                    {section.title}
                    <FiChevronDown
                      className={`transform transition-transform ${
                        expandedSection === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedSection === i && (
                    <div className="px-4 pb-2">
                      {section.lectures.map((lec, j) => (
                        <div
                          key={j}
                          className="flex justify-between py-2 border-b text-gray-700"
                        >
                          <span>{lec.title}</span>
                          <span className="text-sm text-gray-500">
                            {lec.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </section>

            {/* Requirements */}
            <section className="bg-white p-6 rounded-2xl shadow-md mb-6">
              <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
              <ul className="list-disc list-inside text-gray-700">
                {course.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </section>

            {/* Description */}
            <section className="bg-white p-6 rounded-2xl shadow-md mb-6">
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700">{course.description}</p>
            </section>
          </div>

          {/* RIGHT SIDE - COURSE CARD */}
          <div className="w-full lg:w-96 bg-white shadow-xl rounded-2xl p-6 h-fit sticky top-24">
            <div className="relative mb-4">
              <img
                src="https://dummyimage.com/600x400/000/fff&text=Course+Preview"
                alt="Course Preview"
                className="rounded-xl"
              />
              <button className="absolute inset-0 flex items-center justify-center text-white text-5xl">
                <FiPlayCircle />
              </button>
            </div>
            <p className="text-3xl font-bold mb-2">
              {course.price}{" "}
              <span className="line-through text-gray-500 text-lg">
                {course.originalPrice}
              </span>
            </p>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg mb-2 hover:bg-blue-700 shadow-md">
              Enroll Now
            </button>
            <button className="w-full bg-gray-200 py-3 rounded-lg mb-4 hover:bg-gray-300">
              Add to Cart
            </button>

            <h3 className="font-semibold mb-2">This course includes:</h3>
            <ul className="text-gray-700 list-disc list-inside">
              {course.includes.map((inc, i) => (
                <li key={i}>{inc}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CourseDetails;
