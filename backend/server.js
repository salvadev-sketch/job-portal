import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { initSentry } from "./config/sentry.js";
import jobRoute from "./routes/jobRoute.js";
import recruiterRoute from "./routes/recruiterRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();

initSentry();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Job Portal API is running"));

app.use("/api/jobs", jobRoute);
app.use("/api/recruiter", recruiterRoute);
app.use("/api/user", userRoute);

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
