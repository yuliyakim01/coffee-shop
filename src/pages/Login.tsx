import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';
import '../styles/index.css';
import { validateEmail, validatePassword } from '@/utils/validation';
import eyeOnIcon from '../assets/eye.png';
import eyeOffIcon from '../assets/eye-off.png';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    setEmailError(emailValidationError || '');
    setPasswordError(passwordValidationError || '');

    if (emailValidationError || passwordValidationError) {
      return;
    }

    console.log('Logging in with:', { email, password });
  };

  return (
    <div className="login-container">
      <h1 className="main-h1">Login to your account</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            className="form-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
            }}
            required
          />
          {emailError && <p style={{ color: 'red', fontSize: '14px' }}>{emailError}</p>}
        </div>

        <div className="form-group" style={{ position: 'relative' }}>
          <label>Password:</label>
          <input
            className="form-input"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError('');
            }}
            required
            style={{ paddingRight: '40px' }}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '46px',
              width: '24px',
              height: '24px',
              background: 'transparent',
              border: 'none',
              padding: '0',
              cursor: 'pointer',
              opacity: 0.7,
            }}
          >
            <img
              src={showPassword ? eyeOffIcon : eyeOnIcon}
              alt={showPassword ? 'Hide password' : 'Show password'}
              style={{ width: '100%', height: '100%' }}
            />
          </button>

          {passwordError && <p style={{ color: 'red', fontSize: '14px' }}>{passwordError}</p>}

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </div>

        <button type="submit" className="login-button">
          Login now
        </button>

        <p className="signup-link">
          Don't Have An Account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
