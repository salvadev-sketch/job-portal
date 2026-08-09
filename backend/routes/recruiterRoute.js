import express from "express";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
import { requireAuth, requireRecruiter } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth, requireRecruiter);

// POST /api/recruiter/jobs - add a new job posting
router.post("/jobs", async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, recruiterId: req.recruiterId });
    res.status(201).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/recruiter/jobs - list jobs posted by this recruiter
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find({ recruiterId: req.recruiterId }).sort({ date: -1 });
    res.json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/recruiter/jobs/:id - update a job (e.g. toggle visibility)
router.patch("/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, recruiterId: req.recruiterId },
      req.body,
      { new: true }
    );
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/recruiter/jobs/:id
router.delete("/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, recruiterId: req.recruiterId });
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/recruiter/applications - view applicants across this recruiter's jobs
router.get("/applications", async (req, res) => {
  try {
    const jobs = await Job.find({ recruiterId: req.recruiterId }).select("_id");
    const jobIds = jobs.map((j) => j._id);

    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate("jobId", "title location")
      .sort({ date: -1 });

    res.json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/recruiter/applications/:id - accept/reject an application
router.patch("/applications/:id", async (req, res) => {
  try {
    const { status } = req.body; // "Accepted" | "Rejected"
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!application) return res.status(404).json({ success: false, message: "Application not found" });
    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
