import express from "express";
import {
  createUser,
  loginUser,
  getUserByToken,
  getUserDashboardData,
  getAllCoursesData,
  resetUserPassword,
  getProfileData,
  enrollToCourse,
} from "../controllers/users.js";
import authMiddleware from "../middleware/middleware.js";

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", authMiddleware, getUserByToken);
userRouter.get("/dashboard", authMiddleware, getUserDashboardData);
userRouter.get("/courses", authMiddleware, getAllCoursesData);
userRouter.post("/reset-password", authMiddleware, resetUserPassword);
userRouter.get("/profile", authMiddleware, getProfileData);
userRouter.post("/enroll/:courseId", authMiddleware, enrollToCourse);

export default userRouter;
