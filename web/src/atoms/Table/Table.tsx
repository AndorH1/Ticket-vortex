import React from 'react';

interface TableProps {
  className?: string;
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ className = '', children }) => {
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className={`table-fixed  w-full text-sm text-left  overflow-auto ... ${className}`}>
        {children}
      </table>
    </div>
  );
};
