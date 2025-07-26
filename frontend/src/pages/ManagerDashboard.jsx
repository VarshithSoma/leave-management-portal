import React from "react";
import "./styles/Table.css";

const teamRequests = [
  {
    id: 1,
    name: "John Doe",
    type: "Annual",
    start: "2025-08-10",
    end: "2025-08-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    type: "Sick",
    start: "2025-08-01",
    end: "2025-08-01",
  },
];

const ManagerDashboard = () => (
  <div className="table-container">
    <h2>Team Leave Requests</h2>
    <table>
      <thead>
        <tr>
          <th>Employee</th>
          <th>Leave Type</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {teamRequests.map((req) => (
          <tr key={req.id}>
            <td>{req.name}</td>
            <td>{req.type}</td>
            <td>{req.start}</td>
            <td>{req.end}</td>
            <td>
              <button style={{ marginRight: "5px", color: "green" }}>
                Approve
              </button>
              <button style={{ color: "red" }}>Reject</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default ManagerDashboard;
