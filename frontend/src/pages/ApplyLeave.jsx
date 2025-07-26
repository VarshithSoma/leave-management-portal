// src/pages/ApplyLeave.js
import React from "react";
import "./styles/Form.css";

const ApplyLeave = () => (
  <div className="form-container">
    <h2>Apply for Leave</h2>
    <form>
      <div className="form-group">
        <label>Leave Type</label>
        <select>
          <option>Annual Leave</option>
          <option>Sick Leave</option>
          <option>Unpaid Leave</option>
        </select>
      </div>
      <div className="form-group">
        <label>Start Date</label>
        <input type="date" />
      </div>
      <div className="form-group">
        <label>End Date</label>
        <input type="date" />
      </div>
      <div className="form-group">
        <label>Reason</label>
        <textarea rows="4"></textarea>
      </div>
      <button type="submit" className="form-button">
        Submit Request
      </button>
    </form>
  </div>
);
export default ApplyLeave;
