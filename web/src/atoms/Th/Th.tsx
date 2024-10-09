import React from 'react';

interface ThProps {
  children: React.ReactNode;
}

export const Th: React.FC<ThProps> = ({ children }) => {
  return (
    <th
      scope='col'
      className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center px-4 py-3'
    >
      {children}
    </th>
  );
};
