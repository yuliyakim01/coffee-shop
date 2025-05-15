import React, { type ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface AuthRedirectMessageProps {
  message: string;
  linkText: string;
  linkTo: string;
}

const AuthRedirectMessage: React.FC<AuthRedirectMessageProps> = ({
  message,
  linkText,
  linkTo,
}: AuthRedirectMessageProps): ReactElement => {
  return (
    <p className="w-full text-center text-sm mt-5">
      {message}
      <Link to={linkTo} className="text-blue-500 font-medium underline ml-1">
        {linkText}
      </Link>
    </p>
  );
};

export default AuthRedirectMessage;
