import React, { useState, useEffect } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [summary, setSummary] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded total quotas as the API doesn't provide them
  const totalQuotas = {
    'Annual Leave': 20,
    'Sick Leave': 10,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const balancePromise = api.get("/user/balance");
        const calendarPromise = api.get("/user/calendar");

        const [balanceRes, calendarRes] = await Promise.all([balancePromise, calendarPromise]);

        // Process leave summary
        const balanceData = balanceRes.data.map(item => ({
          ...item,
          total: totalQuotas[item.leave_type] || 'N/A',
          taken: totalQuotas[item.leave_type] ? totalQuotas[item.leave_type] - item.remaining_days : 'N/A'
        }));
        setSummary(balanceData);

        // Process upcoming holidays
        const upcoming = calendarRes.data.holidays
          .filter(h => new Date(h.holiday_date) > new Date())
          .slice(0, 2); // Get the next 2 holidays
        setHolidays(upcoming);

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1, padding: "20px", backgroundColor: "white", borderRadius: "8px" }}>
          <h3>Leave Summary</h3>
          {summary.length > 0 ? (
            summary.map(item => (
              <p key={item.leave_type}>{item.leave_type} Taken: {item.taken}/{item.total}</p>
            ))
          ) : (
            <p>No leave summary available.</p>
          )}
        </div>
        <div style={{ flex: 1, padding: "20px", backgroundColor: "white", borderRadius: "8px" }}>
          <h3>Upcoming Holidays</h3>
          {holidays.length > 0 ? (
            holidays.map(h => (
              <p key={h.id}>{h.name} - {new Date(h.holiday_date).toLocaleDateString()}</p>
            ))
          ) : (
            <p>No upcoming holidays.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;