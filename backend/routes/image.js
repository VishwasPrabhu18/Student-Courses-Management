import express from "express";
import authMiddleware from "../middleware/middleware.js";
import { fetchImages, uploadImage } from "../controllers/image.js";
import { upload } from "../middleware/upload.js";

const imageRouter = express.Router();

imageRouter.get("/thumbnails", authMiddleware, fetchImages);
imageRouter.post("/upload", authMiddleware, upload.single("image"), uploadImage);

export default imageRouter;