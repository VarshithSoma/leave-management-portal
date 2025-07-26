// src/pages/AdminDashboard.js
import React from "react";
import "./styles/Table.css";

const AdminDashboard = () => (
  <div>
    <h2>Admin Dashboard</h2>
    <div className="table-container">
      <h3>Manage Users</h3>
      {/* Placeholder for user management table */}
      <p>User management interface goes here.</p>
    </div>
    <div className="table-container" style={{ marginTop: "20px" }}>
      <h3>Manage Holidays & Leave Types</h3>
      {/* Placeholder for settings */}
      <p>
        Holiday settings, leave quotas, and types management interface goes
        here.
      </p>
    </div>
  </div>
);
export default AdminDashboard;
