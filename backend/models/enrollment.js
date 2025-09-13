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
    completedLectures: [
      {
        section: { type: String },
        lectureTitle: { type: String },
        completedAt: { type: Date, default: Date.now },
      },
    ],
    notes: [
      {
        lectureTitle: { type: String },
        content: { type: String },
        createdAt: { type: Date, default: Date.now },
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