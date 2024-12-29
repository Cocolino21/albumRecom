import React, { useState } from 'react';
import { registerUser } from '../serviceLayer/authApi.js';
import styles from './componentsCss/LoginForm.css'; // Reusing the same CSS

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const success = await registerUser(formData);
      if (success) {
        window.location.replace("/login");
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during registration.');
      console.error('Registration error:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Create Account</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              placeholder="Choose a username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Create a password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="form-footer">
            <label className="remember-me">
              <input type="checkbox" className="checkbox" required />
              <span className="checkbox-label">I agree to the Terms & Conditions</span>
            </label>
          </div>
          {error && <div className="error-message" style={{ color: 'var(--error-color)', marginTop: '10px', textAlign: 'center' }}>{error}</div>}
          <button type="submit" className="login-button">
            Create Account
          </button>
        </form>
        <p className="signup-text">
          Already have an account? <a href="/login" className="signup-link">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;