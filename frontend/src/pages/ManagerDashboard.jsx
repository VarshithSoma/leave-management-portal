import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./styles/Table.css";

const ManagerDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeamRequests = async () => {
    setLoading(true);
    try {
      const response = await api.get("/manager/team/requests");
      setRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch team requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamRequests();
  }, []);

  const handleAction = async (requestId, status) => {
    try {
      await api.put(`/manager/team/requests/${requestId}`, { status });
      // Refresh the list after action
      fetchTeamRequests();
    } catch (error) {
      console.error(`Failed to ${status} request:`, error);
      alert(`Error: Could not ${status} the request.`);
    }
  };

  if (loading) return <p>Loading team requests...</p>;

  return (
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
          {requests.length > 0 ? (
            requests.map((req) => (
              <tr key={req.id}>
                <td>{`${req.first_name} ${req.last_name}`}</td>
                <td>{req.leave_type}</td>
                <td>{new Date(req.start_date).toLocaleDateString()}</td>
                <td>{new Date(req.end_date).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleAction(req.id, "approved")}
                    style={{ marginRight: "5px", color: "green" }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(req.id, "rejected")}
                    style={{ color: "red" }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No pending team requests.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerDashboard;