import type { ReactElement, ChangeEvent } from 'react';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import type { HandleInputType, InputHandle, InputProps, RefInputType, RefPropType } from '@/data/interfaces';

const Input: RefInputType = forwardRef<InputHandle, InputProps>(
  ({ label, type = 'text', placeholder, validate }: InputProps, ref: RefPropType): ReactElement => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const handleChange: HandleInputType = (e: ChangeEvent<HTMLInputElement>): void => {
      const newValue: string = e.target.value;
      setValue(newValue);
      setError(validate(newValue) ?? '');
    };
    useImperativeHandle(ref, (): InputHandle => {
      return {
        getValue: (): string => value,
        getError: (): string => error,
        setValueExternally: (valueExternal: string): void => {
          setValue(valueExternal);
          setError(validate(valueExternal) ?? '');
        },
      };
    });
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
  }
);

export default Input;
