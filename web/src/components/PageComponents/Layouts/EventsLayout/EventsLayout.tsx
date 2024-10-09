import React, { PropsWithChildren } from 'react';

interface EventsLayoutProps extends PropsWithChildren {}
export const EventsLayout: React.FC<EventsLayoutProps> = ({ children }) => {
  return (
    <>
      <main className='flex-1 overflow-y-auto p-4'>{children}</main>
    </>
  );
};
