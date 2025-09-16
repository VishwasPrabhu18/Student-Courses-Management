import express from "express";
import authMiddleware from "../middleware/middleware.js";
import { fetchImages,uploadProfilePic, uploadThumbnail } from "../controllers/image.js";
import { upload } from "../middleware/upload.js";

const imageRouter = express.Router();

imageRouter.get("/thumbnails", authMiddleware, fetchImages);
imageRouter.post("/upload-profile-pic", authMiddleware, upload.single("image"), uploadProfilePic);
imageRouter.post("/upload-thumbnail/:cId", authMiddleware, upload.single("image"), uploadThumbnail);

export default imageRouter;