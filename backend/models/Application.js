import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Clerk user id (applicant)
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    resumeUrl: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

applicationSchema.index({ userId: 1, jobId: 1 }, { unique: true });

export default mongoose.model("Application", applicationSchema);
