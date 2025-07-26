import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./styles/Table.css";
import "./styles/Form.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for new holiday form
  const [holidayName, setHolidayName] = useState("");
  const [holidayDate, setHolidayDate] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const usersPromise = api.get("/admin/users");
      const holidaysPromise = api.get("/admin/holidays");
      const [usersRes, holidaysRes] = await Promise.all([
        usersPromise,
        holidaysPromise,
      ]);
      setUsers(usersRes.data);
      setHolidays(holidaysRes.data);
    } catch (error) {
      console.error("Failed to fetch admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddHoliday = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/holidays", {
        name: holidayName,
        holidayDate: holidayDate,
      });
      setHolidayName("");
      setHolidayDate("");
      fetchData(); // Refresh data
    } catch (error) {
      console.error("Failed to add holiday:", error);
    }
  };

  const handleDeleteHoliday = async (holidayId) => {
    if (window.confirm("Are you sure you want to delete this holiday?")) {
      try {
        await api.delete(`/admin/holidays/${holidayId}`);
        fetchData(); // Refresh data
      } catch (error) {
        console.error("Failed to delete holiday:", error);
      }
    }
  };

   const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/admin/users/${userId}`);
        fetchData(); // Refresh data
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };


  if (loading) return <p>Loading admin data...</p>;

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* User Management */}
      <div className="table-container">
        <h3>Manage Users</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{`${user.first_name} ${user.last_name}`}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button style={{ marginRight: "5px" }}>Edit</button>
                  <button style={{ color: "red" }} onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
         {/* Add User form could go here */}
      </div>

      {/* Holiday Management */}
      <div className="table-container" style={{ marginTop: "20px" }}>
        <h3>Manage Holidays</h3>
         {/* Add Holiday Form */}
        <form onSubmit={handleAddHoliday} className="form-inline">
            <input
              type="text"
              placeholder="Holiday Name"
              value={holidayName}
              onChange={(e) => setHolidayName(e.target.value)}
              required
            />
            <input
              type="date"
              value={holidayDate}
              onChange={(e) => setHolidayDate(e.target.value)}
              required
            />
            <button type="submit" className="form-button">Add Holiday</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Holiday Name</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday) => (
              <tr key={holiday.id}>
                <td>{holiday.name}</td>
                <td>{new Date(holiday.holiday_date).toLocaleDateString()}</td>
                <td>
                  <button style={{ color: "red" }} onClick={() => handleDeleteHoliday(holiday.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminDashboard;