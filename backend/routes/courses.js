import express from "express";
import authMiddleware from "../middleware/middleware.js";
import { createCourse, getAllCourses } from "../controllers/courses.js";

const courseRouter = express.Router();

courseRouter.post("/", authMiddleware, createCourse);
courseRouter.get("/", authMiddleware, getAllCourses);

export default courseRouter;
