
import React, { useState } from "react";
import "./Signup.css";
import NavBar from "../NavBar";
import Footer from "../Footer";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send only the fields that the backend expects
      const signupData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        createdAt: new Date()
      };

      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });
      const data = await response.json();
      if (data.success) {
        alert("Signup successful! Redirecting to dashboard...");
        // Store user token if provided
        if (data.token) {
          localStorage.setItem('token', data.token);
          // Pass token to dashboard via URL parameter
          window.location.href = `http://localhost:5174?token=${data.token}`;
        } else {
          window.location.href = "http://localhost:5174";
        }
      } else {
        alert(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="signup-container">
        <h2>Create Your Zerodha Account</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Full Name</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your full name"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

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
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        
        <div className="signin-option">
          <p>Already have an account? 
            <a href="/login" className="signin-link"> Sign In</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;