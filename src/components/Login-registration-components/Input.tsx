import React from 'react';

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  validate: (value: string) => string | null;
  setError: (error: string) => void;
  error: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  setValue,
  validate,
  setError,
  error,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setError(validate(newValue) || '');
  };

  return (
    <div className="flex flex-col w-full">
      {label && <label className="font-semibold text-base mb-1">{label}</label>}
      <input
        className="w-full h-12 px-3 border border-gray-300 rounded-lg bg-white font-poppins text-base"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
