// controllers/userController.js
const Leave = require("../models/leaveModel");
const Holiday = require("../models/holidayModel");

// @desc    Get all leave requests for the logged-in user
const getUserRequests = async (req, res, next) => {
  try {
    const requests = await Leave.findRequestsByUserId(req.user.id);
    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new leave request
const createLeaveRequest = async (req, res, next) => {
  try {
    const { leaveTypeId, startDate, endDate, reason } = req.body;
    const requestData = {
      userId: req.user.id,
      leaveTypeId,
      startDate,
      endDate,
      reason,
    };
    const newRequest = await Leave.createRequest(requestData);
    res.status(201).json(newRequest);
  } catch (error) {
    next(error);
  }
};

// @desc    Get the leave balance for the logged-in user
const getUserBalance = async (req, res, next) => {
  try {
    const balance = await Leave.findBalanceByUserId(req.user.id);
    res.status(200).json(balance);
  } catch (error) {
    next(error);
  }
};

// @desc    Get calendar data (personal leaves and holidays)
const getUserCalendar = async (req, res, next) => {
  try {
    const year = new Date().getFullYear();
    const holidays = await Holiday.findByYear(year);
    const personalLeaves = await Leave.findRequestsByUserId(req.user.id);
    // You can filter personalLeaves for 'approved' status if needed
    res.status(200).json({ holidays, personalLeaves });
  } catch (error) {
    next(error);
  }
};

// @desc    Get the profile of the logged-in user
const getUserProfile = (req, res) => {
  // The user object is attached by the 'protect' middleware
  res.status(200).json(req.user);
};

module.exports = {
  getUserRequests,
  createLeaveRequest,
  getUserBalance,
  getUserCalendar,
  getUserProfile,
};
