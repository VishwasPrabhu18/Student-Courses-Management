import express from "express";
// import { getUsers,createUser, loginUser, deleteUser } from "../controllers/users.js";

const adminRouter = express.Router();

adminRouter.get("/", getUsers);
// adminRouter.post("/register",createUser);
// adminRouter.post("/login", loginUser);
// adminRouter.get("/:id", getUserById);

export default adminRouter;
