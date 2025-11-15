import EnrollmentModal from "../models/enrollment.js";
import UserModel from "../models/users.js";

export const getUsers = async (req, res) => {
  try {
    const userData = await UserModel.find();
    res.status(200).json(userData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllSudents = async (req, res) => {
  try {
    const userData = await UserModel.find({ role: "user" }).select("-password");
    res.status(200).json(userData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUsersByCourseId = async (req, res) => {
  const { courseId } = req.params;
  try {
    const enrolledUser = await EnrollmentModal.find({ courseId })
      .populate("userId", "firstName lastName email phoneNumber")
      .select("userId enrollmentDate status progress lastAccessed");
    res.status(200).json(enrolledUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ role: { $ne: "admin" } }).select(
      "firstName lastName email phoneNumber role"
    );

    const usersWithEnrollments = await Promise.all(
      users.map(async (user) => {
        const enrollments = await EnrollmentModal.find({ userId: user._id })
          .populate("courseId", "title description") // get course name and description
          .select("status enrollmentDate endDate"); // pick only needed fields

        const formattedEnrollments = enrollments.map((enrollment) => ({
          courseTitle: enrollment.courseId?.title || "N/A",
          status: enrollment.status || "Not Started",
        }));

        return {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phoneNumber || "N/A",
          role: user.role,
          enrolledCourses: formattedEnrollments.length
            ? formattedEnrollments
            : [],
        };
      })
    );

    res.status(200).json({
      success: true,
      count: usersWithEnrollments.length,
      data: usersWithEnrollments,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
