import express from "express";
import authMiddleware from "../middleware/middleware.js";
import { fetchImages } from "../controllers/image.js";

const imageRouter = express.Router();

imageRouter.get("/thumbnails", authMiddleware, fetchImages);

export default imageRouter;