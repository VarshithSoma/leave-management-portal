// controllers/managerController.js
const Leave = require("../models/leaveModel");

// @desc    Get pending leave requests for the manager's team
const getTeamRequests = async (req, res, next) => {
  try {
    const requests = await Leave.findPendingByManagerId(req.user.id);
    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};

// @desc    Approve or reject a team member's leave request
const updateRequestStatus = async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'
    const approverId = req.user.id;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // TODO: Add logic to update user's leave balance if request is approved
    // 1. Fetch the request to get user_id, start_date, end_date
    // 2. Calculate the number of days
    // 3. Update the user's leave_balance record

    await Leave.updateRequestStatus(requestId, status, approverId);
    res.status(200).json({ message: `Request has been ${status}` });
  } catch (error) {
    next(error);
  }
};
const getTeamCalendar = async (req, res, next) => {
  try {
    const managerId = req.user.id;
    // You would typically create a new model function to find approved team requests.
    // For now, let's assume a function `findApprovedByManagerId` exists.
    // const teamLeaves = await Leave.findApprovedByManagerId(managerId);

    // Placeholder: for now we can just show pending requests on the calendar
    const teamLeaves = await Leave.findPendingByManagerId(managerId);

    const year = new Date().getFullYear();
    const holidays = await Holiday.findByYear(year);

    res.status(200).json({ teamLeaves, holidays });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getTeamRequests,
  updateRequestStatus,
  getTeamCalendar, // <-- Add this line
};
