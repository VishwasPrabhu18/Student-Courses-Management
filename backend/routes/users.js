import express from "express";
import {
  createUser,
  loginUser,
  getUserByToken,
  getUserDashboardData,
  getAllCoursesData,
} from "../controllers/users.js";
import authMiddleware from "../middleware/middleware.js";

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", authMiddleware, getUserByToken);
userRouter.get("/dashboard", authMiddleware, getUserDashboardData);
userRouter.get("/courses", authMiddleware, getAllCoursesData);

export default userRouter;
