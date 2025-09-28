const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/requireAdmin");

// ✅ Example: every logged-in user can access their profile
router.get("/me", auth, (req, res) => {
  res.json({ message: "This is your profile", user: req.user });
});

// ✅ Example: only admins can access
router.get("/admin/dashboard", auth, requireAdmin, (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

module.exports = router;
