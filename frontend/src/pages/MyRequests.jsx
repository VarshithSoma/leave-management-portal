import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./styles/Table.css";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get("/user/requests");
        setRequests(response.data);
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (loading) return <p>Loading your requests...</p>;

  return (
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
          {requests.length > 0 ? (
            requests.map((req) => (
              <tr key={req.id}>
                <td>{req.leave_type}</td>
                <td>{new Date(req.start_date).toLocaleDateString()}</td>
                <td>{new Date(req.end_date).toLocaleDateString()}</td>
                <td className={`status-${req.status.toLowerCase()}`}>
                  {req.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">You have not made any requests.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyRequests;