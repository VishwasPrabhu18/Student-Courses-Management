import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      default: "enrolled",
    },
    progress: {
      type: Number,
      default: 0,
    },
    lectureInProgress: [
      {
        section: { type: String, default: "" },
        lectures: [
          {
            title: { type: String, default: "" },
            duration: { type: String, default: "" },
            videoUrl: { type: String, default: "" },
            isDone: { type: Boolean, default: false },
          },
        ],
      },
    ],
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
    certificateIssued: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const EnrollmentModal = mongoose.model("Enrollment", enrollmentSchema);

export default EnrollmentModal;
