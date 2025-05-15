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
import TogglePasswordVisibleButton from '@/components/Login-registration-components/TogglePasswordVisibleButton';

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

            <TogglePasswordVisibleButton showPassword={showPassword} onToggle={() => setShowPassword(!showPassword)} />

            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}

            <div className="flex justify-end w-full mt-1">
              <Link to="/forgot-password" className="text-blue-500 text-sm underline">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-[52px] flex justify-center items-center bg-[#6f4e37] text-white font-semibold text-lg rounded-lg mt-5"
          >
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
