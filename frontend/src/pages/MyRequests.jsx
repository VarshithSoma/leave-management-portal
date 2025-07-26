// src/pages/MyRequests.js
import React from "react";
import "./styles/Table.css";

const requests = [
  {
    id: 1,
    type: "Annual",
    start: "2025-08-01",
    end: "2025-08-05",
    status: "Approved",
  },
  {
    id: 2,
    type: "Sick",
    start: "2025-07-20",
    end: "2025-07-21",
    status: "Approved",
  },
  {
    id: 3,
    type: "Annual",
    start: "2025-09-10",
    end: "2025-09-12",
    status: "Pending",
  },
];

const MyRequests = () => (
  <div className="table-container">
    <h2>My Leave Requests</h2>
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((req) => (
          <tr key={req.id}>
            <td>{req.type}</td>
            <td>{req.start}</td>
            <td>{req.end}</td>
            <td className={`status-${req.status.toLowerCase()}`}>
              {req.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default MyRequests;
