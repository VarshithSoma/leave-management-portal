import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./styles/Table.css";

const LeaveBalance = () => {
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // As the API for balance doesn't return total quota, we hardcode it here.
  // In a real app, this might come from another API endpoint or config.
  const totalQuotas = {
    'Annual Leave': 20,
    'Sick Leave': 10,
    'Unpaid Leave': 'N/A'
  };


  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await api.get("/user/balance");
        setBalances(response.data);
      } catch (error) {
        console.error("Failed to fetch leave balance:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBalance();
  }, []);
  
  if (loading) return <p>Loading leave balance...</p>;

  return (
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
          {balances.length > 0 ? (
             balances.map((balance) => (
              <tr key={balance.leave_type}>
                <td>{balance.leave_type}</td>
                <td>{balance.remaining_days}</td>
                <td>{totalQuotas[balance.leave_type]}</td>
              </tr>
            ))
          ) : (
            <tr>
                <td colSpan="3">No balance information available.</td>
            </tr>
          )}
          {/* Manually add Unpaid leave if not in API response */}
          {!balances.some(b => b.leave_type === 'Unpaid Leave') && (
             <tr>
                <td>Unpaid Leave</td>
                <td>N/A</td>
                <td>N/A</td>
              </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveBalance;