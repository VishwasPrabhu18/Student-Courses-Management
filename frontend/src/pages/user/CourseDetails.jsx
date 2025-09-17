import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiCheckCircle, FiPlayCircle, FiChevronDown } from "react-icons/fi";
import axiosConfig from "../../api/axiosConfig";
import LoadingDots from "../../components/LoadingDots";
import UserLayout from "./UserLayout";
import PaymentModal from "../../components/PaymentModal ";
import { FaArrowLeft } from "react-icons/fa";

const CourseDetails = () => {
  const { id } = useParams();
  const decodedId = atob(id);

  const [expandedSection, setExpandedSection] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);

  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourseById = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const res = await axiosConfig.get(`/api/courses/${decodedId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setCourseData(res.data.data);
          setAlreadyEnrolled(res.data.enrolled);
        }
      } catch (error) {
        console.log("Error fetching course by ID:", error);
        return null;
      } finally {
        setLoading(false);
      }
    };
    getCourseById();
  }, []);

  if (loading) {
    return (
      <UserLayout>
        <LoadingDots />
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="bg-gray-50 min-h-screen">
        <div className="px-6 py-6 border-b bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
            {courseData.title}
            </h1>
            <Link to="/user/courses" className="flex items-center gap-3 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500">
              <FaArrowLeft />
              <span>Back to Courses</span>
            </Link>
          </div>
          <p className="text-lg text-gray-700 mt-2">{courseData.description}</p>
        </div>

        <div className="flex flex-col lg:flex-row px-6 pt-8">
          {/* LEFT SIDE CONTENT */}
          <div className="flex-1 lg:pr-10">
            {/* What you'll learn */}
            <section className="bg-white p-6 rounded-2xl shadow-md mb-6">
              <h2 className="text-2xl font-semibold mb-4">What you'll learn</h2>
              <div className="flex flex-col gap-3">
                {courseData?.whatYouLearn?.map((item, i) => (
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
              {courseData?.courseContent?.map((section, i) => (
                <div key={i} className="mb-4 border rounded-lg">
                  <button
                    className="flex justify-between items-center w-full px-4 py-3 font-semibold text-left hover:bg-gray-50 hover:rounded-lg"
                    onClick={() =>
                      setExpandedSection(expandedSection === i ? null : i)
                    }
                  >
                    {section.section}
                    <FiChevronDown
                      className={`transform transition-transform ${expandedSection === i ? "rotate-180" : ""
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
                {courseData?.requirements?.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </section>

            {/* Description */}
            <section className="bg-white p-6 rounded-2xl shadow-md mb-6">
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700">{courseData.description}</p>
            </section>
          </div>

          {/* RIGHT SIDE - COURSE CARD */}
          <div className="w-full lg:w-96 bg-white shadow-xl rounded-2xl p-6 h-fit sticky top-24 mb-6">
            <div className="relative mb-4">
              <img
                src={
                  courseData.thumbnail ||
                  "https://via.placeholder.com/400x200.png?text=Course+Thumbnail"
                }
                alt="Course Preview"
                className="rounded-xl"
              />
              <button className="absolute inset-0 flex items-center justify-center text-white text-5xl">
                <FiPlayCircle />
              </button>
            </div>

            <div className="mb-4 flex items-center gap-4">
              <span className="text-lg font-semibold">Price:</span>
              <p className="text-3xl font-bold mb-2">
                {courseData.offeredPrice === 0 ? (
                  `₹${courseData.originalPrice}`
                ) : (
                  <>
                    ₹{courseData.offeredPrice}{" "}
                    <span className="text-gray-500 text-lg line-through ml-2">
                      ₹{courseData.originalPrice}
                    </span>
                  </>
                )}
              </p>
            </div>

            {
              alreadyEnrolled ? (
                <button
                  disabled
                  className="w-full bg-green-600 text-white py-3 rounded-lg mb-2 cursor-default shadow-md">
                  Already Enrolled
                </button>
              ) : (
                <button
                  onClick={() => setPaymentModalOpen(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg mb-2 hover:bg-blue-700 shadow-md">
                  Enroll Now
                </button>
              )
            }

            <h3 className="font-semibold mb-2">This course includes:</h3>
            <ul className="text-gray-700 list-disc list-outside pl-6">
              {courseData?.highlights?.map((inc, i) => (
                <li key={i} className="leading-relaxed">
                  {inc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <PaymentModal isOpen={paymentModalOpen} onClose={() => setPaymentModalOpen(false)} course={courseData} />
    </UserLayout >
  );
};

export default CourseDetails;
