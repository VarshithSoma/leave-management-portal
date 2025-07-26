// models/leaveModel.js
const db = require("../config/database.js");

const Leave = {
  /**
   * Creates a new leave request in the database.
   * @param {object} requestData - The data for the leave request.
   * @returns {Promise<{id: number}>} The ID of the newly created request.
   */
  async createRequest({ userId, leaveTypeId, startDate, endDate, reason }) {
    const sql = `
      INSERT INTO leave_requests (user_id, leave_type_id, start_date, end_date, reason)
      VALUES (?, ?, ?, ?, ?)
    `;
    const result = await db.query(sql, [
      userId,
      leaveTypeId,
      startDate,
      endDate,
      reason,
    ]);
    return { id: result.insertId };
  },

  /**
   * Finds all leave requests for a specific user, joining with leave types.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<Array<object>>} A list of the user's leave requests.
   */
  async findRequestsByUserId(userId) {
    const sql = `
      SELECT r.id, r.start_date, r.end_date, r.status, r.reason, t.name AS leave_type
      FROM leave_requests r
      JOIN leave_types t ON r.leave_type_id = t.id
      WHERE r.user_id = ?
      ORDER BY r.start_date DESC
    `;
    return await db.query(sql, [userId]);
  },

  /**
   * Finds pending leave requests for a manager's team.
   * @param {number} managerId - The ID of the manager.
   * @returns {Promise<Array<object>>} A list of pending requests for the team.
   */
  async findPendingByManagerId(managerId) {
    const sql = `
      SELECT r.id, r.start_date, r.end_date, r.reason, 
             t.name AS leave_type, 
             u.first_name, u.last_name
      FROM leave_requests r
      JOIN users u ON r.user_id = u.id
      JOIN leave_types t ON r.leave_type_id = t.id
      WHERE u.manager_id = ? AND r.status = 'pending'
      ORDER BY r.start_date ASC
    `;
    return await db.query(sql, [managerId]);
  },

  /**
   * Updates the status of a specific leave request.
   * @param {number} requestId - The ID of the leave request to update.
   * @param {string} status - The new status ('approved' or 'rejected').
   * @param {number} approverId - The ID of the manager approving/rejecting.
   * @returns {Promise<object>} The result of the update operation.
   */
  async updateRequestStatus(requestId, status, approverId) {
    const sql =
      "UPDATE leave_requests SET status = ?, approved_by = ? WHERE id = ?";
    return await db.query(sql, [status, approverId, requestId]);
  },

  /**
   * Gets the current leave balances for a user for a specific year.
   * @param {number} userId - The ID of the user.
   * @param {number} [year] - The year to check balances for. Defaults to current year.
   * @returns {Promise<Array<object>>} A list of leave balances.
   */
  async findBalanceByUserId(userId, year) {
    const currentYear = year || new Date().getFullYear();
    const sql = `
      SELECT b.remaining_days, t.name AS leave_type
      FROM leave_balances b
      JOIN leave_types t ON b.leave_type_id = t.id
      WHERE b.user_id = ? AND b.year = ?
    `;
    return await db.query(sql, [userId, currentYear]);
  },

  /**
   * Retrieves all available leave types from the database.
   * @returns {Promise<Array<object>>} A list of all leave types.
   */
  async findAllTypes() {
    const sql = "SELECT * FROM leave_types";
    return await db.query(sql);
  },
};

module.exports = Leave;
