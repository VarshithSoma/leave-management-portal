// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import LoginPage from "./pages/LoginPage.jsx"; // Corrected
import Dashboard from "./pages/Dashboard.jsx"; // Corrected
import ApplyLeave from "./pages/ApplyLeave.jsx"; // Corrected
import MyRequests from "./pages/MyRequests.jsx"; // Corrected
import LeaveBalance from "./pages/LeaveBalance.jsx"; // Corrected
import CalendarPage from "./pages/CalendarPage.jsx"; // Corrected
import ManagerDashboard from "./pages/ManagerDashboard.jsx"; // Corrected
import AdminDashboard from "./pages/AdminDashboard.jsx"; // Corrected
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/apply-leave" element={<ApplyLeave />} />
          <Route path="/my-requests" element={<MyRequests />} />
          <Route path="/leave-balance" element={<LeaveBalance />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
