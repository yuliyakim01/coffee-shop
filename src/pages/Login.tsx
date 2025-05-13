import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';
import '../styles/index.css';

const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      <h1 className="main-h1">Login to your account</h1>
      <form className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input className="form-input" type="email" placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input className="form-input" type="password" placeholder="Enter your password" required />
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </div>

        <button type="submit" className="login-button">
          Login now
        </button>

        <p className="signup-link">
          Don't Have An Account?
          <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
