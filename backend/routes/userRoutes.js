// routes/userRoutes.js
const express = require("express");
const {
  getUserRequests,
  createLeaveRequest,
  getUserBalance,
  getUserCalendar,
  getUserProfile,
} = require("../controllers/userController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Correct the import here by adding curly braces {}

const router = express.Router();

// This now correctly uses the 'protect' function
router.use(protect);

router.route("/requests").get(getUserRequests).post(createLeaveRequest);
router.get("/balance", getUserBalance);
router.get("/calendar", getUserCalendar);
router.get("/profile", getUserProfile);

module.exports = router;
