import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/users.js";

dotenv.config();

const app = express();

//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/users", userRouter);

const PORT = process.env.PORT || 8080;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.error(`Error connecting to MongoDB: ${error.message}`));