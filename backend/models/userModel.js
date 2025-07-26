// models/userModel.js
const db = require("../config/database.js");

const User = {
  /**
   * Finds a single user by their email address.
   * @param {string} email - The email of the user to find.
   * @returns {Promise<object|undefined>} The user object or undefined if not found.
   */
  async findByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [user] = await db.query(sql, [email]);
    return user;
  },

  /**
   * Finds a single user by their ID.
   * @param {number} id - The ID of the user to find.
   * @returns {Promise<object|undefined>} The user object without the password hash.
   */
  async findById(id) {
    const sql =
      "SELECT id, first_name, last_name, email, role, manager_id FROM users WHERE id = ?";
    const [user] = await db.query(sql, [id]);
    return user;
  },

  /**
   * Retrieves all users from the database.
   * @returns {Promise<Array<object>>} A list of all users.
   */
  async findAll() {
    const sql =
      "SELECT id, first_name, last_name, email, role, manager_id FROM users ORDER BY last_name, first_name";
    return await db.query(sql);
  },

  /**
   * Creates a new user.
   * @param {object} userData - The user's data.
   * @returns {Promise<{id: number}>} The ID of the newly created user.
   */
  async create({ firstName, lastName, email, passwordHash, role, managerId }) {
    const sql = `
      INSERT INTO users (first_name, last_name, email, password_hash, role, manager_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const result = await db.query(sql, [
      firstName,
      lastName,
      email,
      passwordHash,
      role,
      managerId,
    ]);
    return { id: result.insertId };
  },

  /**
   * Updates an existing user's information.
   * @param {number} id - The ID of the user to update.
   * @param {object} userData - The user data to update.
   * @returns {Promise<object>} The result of the update operation.
   */
  async update(id, { firstName, lastName, email, role, managerId }) {
    const sql = `
      UPDATE users 
      SET first_name = ?, last_name = ?, email = ?, role = ?, manager_id = ?
      WHERE id = ?
    `;
    return await db.query(sql, [
      firstName,
      lastName,
      email,
      role,
      managerId,
      id,
    ]);
  },

  /**
   * Deletes a user from the database.
   * @param {number} id - The ID of the user to delete.
   * @returns {Promise<object>} The result of the delete operation.
   */
  async remove(id) {
    const sql = "DELETE FROM users WHERE id = ?";
    return await db.query(sql, [id]);
  },
};

module.exports = User;
