import UserModel from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import EnrollmentModal from "../models/enrollment.js";
import CoursesModel from "../models/courses.js";
import mongoose from "mongoose";

export const createUser = async (req, res) => {
  const reqData = req.body;
  const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);
  try {
    const hashedPassword = await bcrypt.hash(
      reqData.password,
      BCRYPT_SALT_ROUNDS
    );
    const newUser = new UserModel({ ...reqData, password: hashedPassword });
    const userData = await newUser.save();

    const { password, ...newData } = userData;
    res.status(201).json(newData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// export const validateJWT = async (req, res) => {
//   const { token } = req.body;

//   try {

//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// }

export const getUserByToken = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userCourseData = await EnrollmentModal.find({ userId });

    if (!userCourseData) {
      return res
        .status(401)
        .json({ message: "Course Data not found for this user" });
    }
    const enrolledCount = userCourseData.filter(
      (course) => course.status === "enrolled"
    ).length;
    const progressCount = userCourseData.filter(
      (course) => course.status === "progress"
    ).length;
    const completedCount = userCourseData.filter(
      (course) => course.status === "completed"
    ).length;
    const certificateCount = userCourseData.filter(
      (course) => course.certificateIssued === true
    ).length;
    const overDueCount = userCourseData.filter((course) => {
      if (course.endDate) {
        return (
          new Date(course.endDate) < new Date() && course.status !== "completed"
        );
      }
      return false;
    }).length;

    return res.status(200).json({
      enrolledCount,
      progressCount,
      completedCount,
      certificateCount,
      overDueCount,
      courseData: userCourseData,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllCoursesData = async (req, res) => {
  try {
    const { search } = req.query;

    let filter = { isActive: true };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const courses = await CoursesModel.find(filter)
      .sort({ createdAt: -1 }) // newest first
      .limit(10);

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const resetUserPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;
  const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);
  try {
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid)
      return res.status(401).json({ message: "Current password is incorrect" });
    const hashedNewPassword = await bcrypt.hash(
      newPassword,
      BCRYPT_SALT_ROUNDS
    );
    user.password = hashedNewPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProfileData = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await UserModel.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    const enrollments = await EnrollmentModal.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "Course", // collection name in DB
          localField: "courseId",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      { $unwind: "$courseDetails" },
      {
        $project: {
          status: 1,
          "courseDetails.title": 1,
        },
      },
    ]);

    let profilePicBase64 = null;
    if (user.profilePic) {
      profilePicBase64 = `data:${
        user.profilePic.contentType
      };base64,${user.profilePic.data.toString("base64")}`;
    }

    res.status(200).json({
      message: "Profile data fetched successfully",
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePic: profilePicBase64,
        phoneNumber: user.phoneNumber,
        joinedDate: user.createdAt,
        enrollments,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const enrollToCourse = async (req, res) => {
  const userId = req.user.id;
  const { courseId } = req.params;

  try {
    const course = await CoursesModel.findById(courseId);
    if (!course) res.status(404).json({ message: "Course not found" });

    const startDate = new Date();
    const endDate = new Date(startDate); // clone current date
    endDate.setMonth(endDate.getMonth() + course.duration); // add months

    const enrollment = await EnrollmentModal.create({
      userId,
      courseId,
      enrollmentDate: startDate,
      endDate: endDate,
    });

    res.status(201).json({
      success: true,
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
