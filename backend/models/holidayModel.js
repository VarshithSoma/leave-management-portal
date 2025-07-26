// models/holidayModel.js
const db = require("../config/database.js");

const Holiday = {
  /**
   * Finds all holidays for a given year.
   * @param {number} year - The year to fetch holidays for.
   * @returns {Promise<Array<object>>} A list of holidays for that year.
   */
  async findByYear(year) {
    const sql =
      "SELECT id, name, holiday_date FROM holidays WHERE year = ? ORDER BY holiday_date ASC";
    return await db.query(sql, [year]);
  },

  /**
   * Creates a new holiday entry.
   * @param {object} holidayData - The holiday's data.
   * @returns {Promise<{id: number}>} The ID of the newly created holiday.
   */
  async create({ name, holidayDate, year }) {
    const sql =
      "INSERT INTO holidays (name, holiday_date, year) VALUES (?, ?, ?)";
    const result = await db.query(sql, [name, holidayDate, year]);
    return { id: result.insertId };
  },

  /**
   * Deletes a holiday from the database.
   * @param {number} id - The ID of the holiday to delete.
   * @returns {Promise<object>} The result of the delete operation.
   */
  async remove(id) {
    const sql = "DELETE FROM holidays WHERE id = ?";
    return await db.query(sql, [id]);
  },
};

module.exports = Holiday;
