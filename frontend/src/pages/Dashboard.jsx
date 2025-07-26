// src/pages/Dashboard.jsx
import React from "react";

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
    <div style={{ display: "flex", gap: "20px" }}>
      <div
        style={{
          flex: 1,
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <h3>Leave Summary</h3>
        <p>Annual Leave Taken: 5/20</p>
        <p>Sick Leave Taken: 2/10</p>
      </div>
      <div
        style={{
          flex: 1,
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <h3>Upcoming Holidays</h3>
        <p>Independence Day - August 15, 2025</p>
        <p>Diwali - October 21, 2025</p>
      </div>
    </div>
  </div>
);

export default Dashboard;
