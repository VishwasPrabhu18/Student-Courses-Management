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
    },
    icon: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    offeredPrice: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
      default: "",
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
      data: Buffer,
      contentType: String,
    },
    instructor: {
      type: String,
      default: "",
    },
    level: {
      type: String,
      default: "Beginner",
    },

    whatYouLearn: [
      {
        type: String,
      },
    ],
    courseContent: [
      {
        section: { type: String, default: "" },
        lectures: [
          {
            title: { type: String, default: "" },
            duration: { type: String, default: "" },
          },
        ],
      },
    ],
    requirements: [
      {
        type: String,
      },
    ],
    highlights: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
