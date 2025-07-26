// routes/adminRoutes.js
const express = require("express");
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getAllHolidays,
  createHoliday,
  deleteHoliday,
  getAllLeaveTypes,
  // ... other admin controller functions
} = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Protect all admin routes and authorize only for 'admin' role
router.use(protect, authorize("admin"));

// --- User Management ---
router.route("/users").get(getAllUsers).post(createUser);
router.route("/users/:userId").put(updateUser).delete(deleteUser);

// --- Holiday Management ---
router.route("/holidays").get(getAllHolidays).post(createHoliday);
router.route("/holidays/:holidayId").delete(deleteHoliday);

// --- Leave Type Management ---
router.route("/leavetypes").get(getAllLeaveTypes);
// Add POST, PUT for leave types if needed

module.exports = router;
