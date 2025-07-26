// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        LeavePortal
      </Link>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/apply-leave">Apply Leave</Link>
        <Link to="/my-requests">My Requests</Link>
        <Link to="/leave-balance">Balance</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/manager">Manager View</Link>
        <Link to="/admin">Admin View</Link>
        <Link to="/login" className="login-link">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
