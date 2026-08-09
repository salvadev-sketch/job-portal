import express from "express";
import Job from "../models/Job.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// GET /api/jobs - list all visible jobs (with optional search/filter)
router.get("/", async (req, res) => {
  try {
    const { search, location, category } = req.query;
    const filter = { visible: true };

    if (search) filter.title = { $regex: search, $options: "i" };
    if (location) filter.location = location;
    if (category) filter.category = category;

    const jobs = await Job.find(filter).sort({ date: -1 });
    res.json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/jobs/:id - single job detail
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/jobs/:id/apply - apply to a job (requires auth)
router.post("/:id/apply", requireAuth, async (req, res) => {
  try {
    const Application = (await import("../models/Application.js")).default;
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    const existing = await Application.findOne({ userId: req.auth.userId, jobId: job._id });
    if (existing) {
      return res.status(400).json({ success: false, message: "Already applied to this job" });
    }

    const application = await Application.create({
      userId: req.auth.userId,
      jobId: job._id,
      resumeUrl: req.body.resumeUrl,
    });

    res.status(201).json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
