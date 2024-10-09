import React from 'react';

interface InputProps {
  type?: 'text' | 'password' | 'number' | 'checkbox' | 'email' | 'file' | 'date' | 'datetime-local';
  placeholder?: string;
  id?: string;
  name?: string;
  value?: string | number;
  className?: string;
  required?: boolean;
  step?: string;
  src?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  type,
  placeholder = '',
  id,
  name,
  className = '',
  value,
  required = false,
  step,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      name={name}
      value={value}
      className={`dark:bg-gray-600  border text-sm rounded-lg block w-full p-2.5 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 ${className}`}
      required={required}
      step={step}
      onChange={onChange}
    />
  );
};
