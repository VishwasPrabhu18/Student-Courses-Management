import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    thumbnail: {
      type: String,
      default: "",
    },
    instructor: {
      type: String,
      default: "",
    },
    level: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const CoursesModel = mongoose.model("Courses", courseSchema);

export default CoursesModel;
