import React from 'react';

interface FormProps {
  className?: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({ className = '', onSubmit, children }) => {
  return (
    <form
      action=''
      className={`'grid grid-cols-1 md:grid-cols-2 gap-6' ${className}`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};
