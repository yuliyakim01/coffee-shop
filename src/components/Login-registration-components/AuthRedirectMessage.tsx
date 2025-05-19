import React, { type ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface AuthRedirectMessageProps {
  message: string;
  label: string;
  to: string;
}

const AuthRedirectMessage: React.FC<AuthRedirectMessageProps> = ({
  message,
  label,
  to,
}: AuthRedirectMessageProps): ReactElement => {
  return (
    <p className="w-full text-center text-sm mt-5">
      {message}
      <Link to={to} className="text-blue-500 font-medium underline ml-1">
        {label}
      </Link>
    </p>
  );
};

export default AuthRedirectMessage;
