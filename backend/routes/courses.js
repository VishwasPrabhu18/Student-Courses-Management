import express from "express";
import authMiddleware from "../middleware/middleware.js";
import { createCourse, deleteCourse, getAllCourses } from "../controllers/courses.js";

const courseRouter = express.Router();

courseRouter.post("/", authMiddleware, createCourse);
courseRouter.get("/", authMiddleware, getAllCourses);
courseRouter.delete("/:id", authMiddleware, deleteCourse);

export default courseRouter;
