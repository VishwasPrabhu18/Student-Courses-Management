import express from "express";
import {
  getUsers,
  createUser,
  loginUser,
  deleteUser,
  getUserById,
  getUserByToken,
} from "../controllers/users.js";
import authMiddleware from "../middleware/middleware.js";

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
// userRouter.get("/", authMiddleware, getUsers);
// userRouter.get("/:id", authMiddleware, getUserById);
// userRouter.delete("/:id", authMiddleware, deleteUser);
userRouter.get("/me", authMiddleware, getUserByToken);

export default userRouter;
