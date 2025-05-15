import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';
import '../styles/index.css';
import { validateEmail, validatePassword } from '@/utils/validation';
import eyeOnIcon from '../assets/eye.png';
import eyeOffIcon from '../assets/eye-off.png';
import BackButton from '@/components/BackButton';

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
      <div className="back-button">
        <BackButton />
      </div>
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
              const value = e.target.value.trim();
              setEmail(value);
              setEmailError(validateEmail(value) || '');
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
            className="absolute right-3 top-1/2 -translate-y-1/2 w-[30px] h-[30px] bg-transparent border-none p-0 cursor-pointer opacity-70 flex justify-center items-center"
          >
            <img
              src={showPassword ? eyeOffIcon : eyeOnIcon}
              alt={showPassword ? 'Hide password' : 'Show password'}
              className="w-[20px] h-[20px] object-contain"
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
