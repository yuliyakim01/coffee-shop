import React, { useState } from 'react';
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
import PasswordInput from '@/components/Login-registration-components/PasswordInput';
import Button from '@/components/Login-registration-components/Button';
import { ROUTES } from '@/data/routes';
import AuthRedirectMessage from '@/components/Login-registration-components/AuthRedirectMessage';

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

          <PasswordInput
            password={password}
            setPassword={setPassword}
            passwordError={passwordError}
            setPasswordError={setPasswordError}
          />

          <Button type="submit" label="Login now" className="mt-5" />

          <AuthRedirectMessage message="Don't have an account?" linkText="Sign Up" linkTo={ROUTES.register} />
          <NotificationBanners
            errorMessage={apiErrorMessage}
            onClearError={() => setApiErrorMessage(null)}
            successMessage={showSuccess}
            onClearSuccess={() => setShowSuccess(null)}
            autoDismissMs={5000}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
