// config/database.js
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "leave_management",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// The mysql2/promise library returns a promise-based pool directly
// so no need for util.promisify
const query = async (sql, params) => {
  const [results] = await pool.execute(sql, params);
  return results;
};

module.exports = {
  query,
};
