import React, { PropsWithChildren } from 'react';

interface TicketLayoutProps extends PropsWithChildren {}
export const TicketLayout: React.FC<TicketLayoutProps> = ({ children }) => {
  return (
    <>
      <main className='flex-1 overflow-y-auto p-4'>{children}</main>
    </>
  );
};
