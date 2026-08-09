import express from "express";
import Application from "../models/Application.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// GET /api/user/applications - jobs the logged-in user has applied to
router.get("/applications", requireAuth, async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.auth.userId })
      .populate("jobId", "title location company salary")
      .sort({ date: -1 });

    res.json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
