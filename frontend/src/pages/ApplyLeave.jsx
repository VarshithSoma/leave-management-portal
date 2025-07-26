import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./styles/Form.css";

const ApplyLeave = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveTypeId, setLeaveTypeId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const response = await api.get("/admin/leavetypes"); // Assuming this is the correct route
        setLeaveTypes(response.data);
        if (response.data.length > 0) {
          setLeaveTypeId(response.data[0].id); // Default to the first type
        }
      } catch (error) {
        console.error("Failed to fetch leave types:", error);
      }
    };
    fetchLeaveTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await api.post("/user/requests", {
        leaveTypeId,
        startDate,
        endDate,
        reason,
      });
      setMessage("Leave request submitted successfully!");
      // Reset form
      setStartDate("");
      setEndDate("");
      setReason("");
    } catch (error) {
      setMessage("Failed to submit request. Please try again.");
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Apply for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Leave Type</label>
          <select value={leaveTypeId} onChange={(e) => setLeaveTypeId(e.target.value)} required>
            {leaveTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Reason</label>
          <textarea rows="4" value={reason} onChange={(e) => setReason(e.target.value)} required></textarea>
        </div>
        {message && <p>{message}</p>}
        <button type="submit" className="form-button">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default ApplyLeave;