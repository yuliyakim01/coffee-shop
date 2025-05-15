import React, { type ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import TogglePasswordVisibleButton from './TogglePasswordVisibleButton';
import { ROUTES } from '@/data/routes';

interface PasswordInputProps {
  password: string;
  setPassword: (value: string) => void;
  passwordError?: string;
  setPasswordError?: (error: string) => void;
  showForgotPassword?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
  passwordError,
  setPasswordError,
  showForgotPassword = true,
}: PasswordInputProps): ReactElement => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <label className="font-semibold text-base mb-1">Password</label>
      <div className="relative w-full">
        <input
          className="w-full h-12 px-3 pr-12 border border-gray-300 rounded-lg bg-white font-poppins text-base"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setPassword(e.target.value);
            setPasswordError?.('');
          }}
          required
        />

        <TogglePasswordVisibleButton
          showPassword={showPassword}
          onToggle={(): void => setShowPassword(!showPassword)}
        />
      </div>
      {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}

      {showForgotPassword && (
        <div className="flex justify-end w-full mt-1">
          <Link to={ROUTES.forgotPassword} className="text-blue-500 text-sm underline">
            Forgot password?
          </Link>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
