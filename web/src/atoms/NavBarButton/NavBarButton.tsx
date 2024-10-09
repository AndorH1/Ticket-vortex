import React from 'react';
import { Link } from 'react-router-dom';

interface NavBarButtonProps {
  children: React.ReactNode;
  to: string;
  className?: string;
  onClick?: () => void;
}

export const NavBarButton: React.FC<NavBarButtonProps> = ({ children, to, className }) => {
  return (
    <Link
      to={to}
      className={`bg-gray-900 hover:bg-gray-700 hover:no-underline text-white rounded-md px-3 py-2 text-sm font-medium no-underline ${className}`}
    >
      {children}
    </Link>
  );
};
