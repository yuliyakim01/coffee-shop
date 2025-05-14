import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';
import '../styles/index.css';
import { validateEmail, validatePassword } from '@/utils/validation';
import eyeOnIcon from '../assets/eye.png';
import eyeOffIcon from '../assets/eye-off.png';
import BackButton from '@/components/BackButton';
import handleApiError from '@/utils/handleApiError';
import ErrorPopup from '@/components/Popup-components/ErrorPopup';
import SuccessPopup from '@/components/Popup-components/SuccessPopup';
import { useAuth } from '@/utils/useAuth';
import NotificationBanners from '@/components/Popup-components/NotificationBanners';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiErrorMessage(null);
    setShowSuccess(null);

    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    setEmailError(emailValidationError || '');
    setPasswordError(passwordValidationError || '');

    if (emailValidationError || passwordValidationError) {
      return;
    }

    console.log('Logging in with:', { email, password });

    try {
      setLoading(true);
      await login(email, password);
      setShowSuccess('Login successful');
    } catch (error: unknown) {
      setApiErrorMessage(handleApiError(error));
    } finally {
      setLoading(false);
    }
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
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '30px',
              height: '30px',
              background: 'transparent',
              border: 'none',
              padding: '0',
              cursor: 'pointer',
              opacity: 0.7,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={showPassword ? eyeOffIcon : eyeOnIcon}
              alt={showPassword ? 'Hide password' : 'Show password'}
              style={{
                width: '20px',
                height: '20px',
                objectFit: 'contain',
              }}
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

      <NotificationBanners
        errorMessage={apiErrorMessage}
        onClearError={() => setApiErrorMessage(null)}
        successMessage={showSuccess}
        onClearSuccess={() => setShowSuccess(null)}
        autoDismissMs={5000}
      />
    </div>
  );
};

export default LoginPage;
