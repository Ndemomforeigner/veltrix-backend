const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// GET DASHBOARD STATS
router.get("/", async (req, res) => {
  try {
    const total = await Project.countDocuments();

    const active = await Project.countDocuments({ status: "active" });
    const completed = await Project.countDocuments({ status: "completed" });
    const pending = await Project.countDocuments({ status: "pending" });

    res.json({
      total,
      active,
      completed,
      pending
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;