// controllers/adminController.js
const User = require("../models/userModel");
const Holiday = require("../models/holidayModel");
const Leave = require("../models/leaveModel");
const bcrypt = require("bcryptjs");

// --- User Management ---
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// controllers/adminController.js

const createUser = async (req, res, next) => {
  try {
    // Set a default value of null for managerId if it's not in the request body
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      managerId = null,
    } = req.body;

    // The rest of the function remains the same...
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      passwordHash,
      role,
      managerId,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, email, role, managerId } = req.body;
    await User.update(userId, { firstName, lastName, email, role, managerId });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.remove(req.params.userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// --- Holiday Management ---
const getAllHolidays = async (req, res, next) => {
  try {
    const year = req.query.year || new Date().getFullYear();
    const holidays = await Holiday.findByYear(year);
    res.status(200).json(holidays);
  } catch (error) {
    next(error);
  }
};

const createHoliday = async (req, res, next) => {
  try {
    const { name, holidayDate } = req.body;
    const year = new Date(holidayDate).getFullYear();
    const newHoliday = await Holiday.create({ name, holidayDate, year });
    res.status(201).json(newHoliday);
  } catch (error) {
    next(error);
  }
};

const deleteHoliday = async (req, res, next) => {
  try {
    await Holiday.remove(req.params.holidayId);
    res.status(200).json({ message: "Holiday deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// --- Leave Type Management ---
const getAllLeaveTypes = async (req, res, next) => {
  try {
    const types = await Leave.findAllTypes();
    res.status(200).json(types);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getAllHolidays,
  createHoliday,
  deleteHoliday,
  getAllLeaveTypes,
};
