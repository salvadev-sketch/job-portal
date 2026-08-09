import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: {
      name: { type: String, required: true },
      logo: { type: String },
    },
    category: { type: String, required: true },
    location: { type: String, required: true },
    level: {
      type: String,
      enum: ["Beginner level", "Intermediate level", "Senior level"],
      required: true,
    },
    salary: { type: Number, required: true },
    recruiterId: { type: String, required: true }, // Clerk user id
    visible: { type: Boolean, default: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
