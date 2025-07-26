// routes/managerRoutes.js
const express = require("express");
const {
  getTeamRequests,
  updateRequestStatus,
  getTeamCalendar,
} = require("../controllers/managerController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Apply middleware to protect routes and authorize only for 'manager' role
router.use(protect, authorize("manager"));

router.get("/team/requests", getTeamRequests);
router.put("/team/requests/:requestId", updateRequestStatus);
router.get("/team/calendar", getTeamCalendar);

module.exports = router;
