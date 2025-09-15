import express from "express";
import { deleteUser, getAllSudents, getUsers } from "../controllers/admin.js";
import authMiddleware from "../middleware/middleware.js";

const adminRouter = express.Router();

adminRouter.get("/", getUsers);
adminRouter.get("/students", authMiddleware, getAllSudents);
adminRouter.delete("/:id", authMiddleware, deleteUser);
// adminRouter.get("/:id", getUserById);

export default adminRouter;
