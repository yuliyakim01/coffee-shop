import React, { type ReactElement } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  label: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  label,
  className = '',
}: ButtonProps): ReactElement => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full h-[52px] flex justify-center items-center bg-[#6f4e37] text-white 
      font-semibold text-lg rounded-lg ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
