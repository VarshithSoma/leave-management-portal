// src/pages/LoginPage.jsx
import React from "react";
import "./styles/Form.css";

const LoginPage = () => (
  <div className="form-container">
    <h2>Login</h2>
    <form>
      <div className="form-group">
        <label>Email</label>
        <input type="email" placeholder="user@example.com" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" />
      </div>
      <button type="submit" className="form-button">
        Login
      </button>
    </form>
  </div>
);

export default LoginPage;
