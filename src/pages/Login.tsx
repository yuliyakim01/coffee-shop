import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { validateEmail, validatePassword } from '@/utils/validation';
import eyeOnIcon from '../assets/eye.png';
import eyeOffIcon from '../assets/eye-off.png';
import handleApiError from '@/utils/handleApiError';
import ErrorPopup from '@/components/Popup-components/ErrorPopup';
import SuccessPopup from '@/components/Popup-components/SuccessPopup';
import { useAuth } from '@/utils/useAuth';
import NotificationBanners from '@/components/Popup-components/NotificationBanners';
import BackButton from '@/components/Login-registration-components/BackButton';
import Input from '@/components/Login-registration-components/Input';

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
    <div className="min-h-screen flex items-center justify-center bg-[#f0e6d7]">
      <div className="flex flex-col items-center w-[40rem] p-12 bg-[#e6d7c2] rounded-2xl shadow-xl mt-24">
        <div className="fixed top-8 left-8 z-50">
          <BackButton />
        </div>
        <h1 className="font-semibold text-4xl mb-8">Login to your account</h1>

        <form className="flex flex-col items-start gap-5 w-full" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            setValue={setEmail}
            validate={validateEmail}
            setError={setEmailError}
            error={emailError}
          />

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
