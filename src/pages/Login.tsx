import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { validateEmail, validatePassword } from '@/utils/validation';
import BackButton from '@/components/Login-registration-components/BackButton';
import Input from '@/components/Login-registration-components/Input';
import PasswordInput from '@/components/Login-registration-components/PasswordInput';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

          <button
            type="submit"
            className="w-full h-[52px] flex justify-center items-center bg-[#6f4e37] text-white font-semibold text-lg rounded-lg mt-5"
          >
            Login now
          </button>

          <p className="w-full text-center text-sm mt-5">
            Don't Have An Account?
            <Link to="/register" className="text-blue-500 font-medium underline ml-1">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
