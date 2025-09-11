import express from "express";
import {
  createUser,
  loginUser,
  getUserById,
  getUserByToken,
} from "../controllers/users.js";
import authMiddleware from "../middleware/middleware.js";

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
// userRouter.get("/:id", authMiddleware, getUserById);
userRouter.get("/me", authMiddleware, getUserByToken);

export default userRouter;
