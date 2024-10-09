import React from 'react';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, children, className = '' }) => {
  return (
    <label htmlFor={htmlFor} className={`block mb-2 text-sm font-medium ${className}`}>
      {children}
    </label>
  );
};
