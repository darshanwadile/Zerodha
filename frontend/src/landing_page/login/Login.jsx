import React, { useState } from "react";
import "./Login.css";
import NavBar from "../NavBar";
import Footer from "../Footer";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        alert("Login successful! Redirecting to dashboard...");
        // Store user token if provided
        if (data.token) {
          localStorage.setItem('token', data.token);
          // Also pass token to dashboard via URL parameter
          window.location.href = `http://localhost:5174?token=${data.token}`;
        } else {
          window.location.href = "http://localhost:5174";
        }
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="login-container">
        <h2>Sign In to Your Account</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-button">Sign In</button>
        </form>
        
        <div className="signup-option">
          <p>Don't have an account? 
            <a href="/signup" className="signup-link"> Sign Up</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
