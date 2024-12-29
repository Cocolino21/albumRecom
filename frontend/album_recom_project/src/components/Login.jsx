import React, { useState } from 'react';
import {loginCheck} from '../serviceLayer/authApi.js'
import styles from './componentsCss/LoginForm.css'
import { useNavigate , Link } from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const success = await loginCheck(formData);
      if (success) {
        window.location.replace("/")
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred during login.');
      console.error('Login error:', err);
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
        <h2 className="login-title">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="username"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your username"
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
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-footer">
            <label className="remember-me">
              <input type="checkbox" className="checkbox" />
              <span className="checkbox-label">Remember me</span>
            </label>
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <p className="signup-text">
          Don't have an account? <Link to="/register" className="signup-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;