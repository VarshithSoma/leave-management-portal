// src/pages/LeaveBalance.js
import React from "react";
import "./styles/Table.css";

const LeaveBalance = () => (
  <div className="table-container">
    <h2>Leave Balance</h2>
    <table>
      <thead>
        <tr>
          <th>Leave Type</th>
          <th>Available</th>
          <th>Total Quota</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Annual Leave</td>
          <td>15</td>
          <td>20</td>
        </tr>
        <tr>
          <td>Sick Leave</td>
          <td>8</td>
          <td>10</td>
        </tr>
        <tr>
          <td>Unpaid Leave</td>
          <td>N/A</td>
          <td>N/A</td>
        </tr>
      </tbody>
    </table>
  </div>
);
export default LeaveBalance;
