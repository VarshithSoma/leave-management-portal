// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/database"); // <-- 1. Import the database config
const morgan = require("morgan");

// Load environment variables
dotenv.config();

// --- Import Routes ---
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const managerRoutes = require("./routes/managerRoutes");
const adminRoutes = require("./routes/adminRoutes");
// ... other routes

const app = express();

// --- Core Middleware ---
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/admin", adminRoutes);
// ... other routes

// --- Server Activation with DB Check ---
const PORT = process.env.PORT || 5005;

const startServer = async () => {
  try {
    // 2. Add the connection test here
    await db.query("SELECT 1"); // A simple query to test the connection
    console.log("✅ Database connected successfully.");

    // 3. Start the Express server only if DB connection is successful
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database.");
    console.error(error);
    process.exit(1); // Exit the process with an error code
  }
};

startServer(); // Call the function to start the server
