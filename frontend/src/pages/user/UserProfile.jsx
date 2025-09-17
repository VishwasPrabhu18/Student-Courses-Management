import { useEffect, useState } from "react";
import UserLayout from "./UserLayout";
import axiosConfig from "../../api/axiosConfig";
import { courseStatus, formatDate } from "../../constants/helperMethods";
import AvatarUpload from "../../components/AvatarUpload";
import { toast } from "react-toastify";
import LoadingDots from "../../components/LoadingDots";

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);

  const hanldeFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const token = localStorage.getItem("token");
      const res = await axiosConfig.post("/api/images/upload-profile-pic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setProfileData((prevData) => ({
          ...prevData,
          profilePic: res.data.imageUrl,
        }));
        toast.success("Profile picture updated successfully!");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to update profile picture.");
    }
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axiosConfig.get("/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setProfileData(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfileData();
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
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8 mt-12">
        {/* Personal Info */}
        <div className="flex flex-col items-center text-center">
          <AvatarUpload
            profilePic={profileData?.profilePic || null}
            onUpload={hanldeFileUpload}
          />
          <h1 className="text-2xl font-bold mt-4">
            {profileData?.firstName} {profileData?.lastName}
          </h1>
          <p className="text-gray-600">{profileData?.email}</p>
          <span className="mt-2 px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
            Student
          </span>
        </div>

        {/* Details */}
        <div className="mt-8 space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Phone</span>
            <span className="text-gray-600">{profileData?.phoneNumber}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Joined Date</span>
            <span className="text-gray-600">{formatDate(profileData?.joinedDate)}</span>
          </div>
        </div>

        {/* Enrolled Courses */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Enrolled Courses ({profileData?.enrollments.length})</h2>
        <ul className="space-y-3">
          {profileData?.enrollments.map((course, idx) => (
            <li
              key={course.courseId.title}
              className="flex justify-between p-3 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <span>{idx + 1}.</span>
                <span>{course.courseId.title}</span>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${courseStatus(course.status)}`}
              >
                {course.status[0].toUpperCase() + course.status.slice(1).replace("-", " ")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </UserLayout>
  );
};

export default UserProfile;
