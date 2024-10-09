import React, { PropsWithChildren } from 'react';
interface ReservationLayoutProps extends PropsWithChildren {}
export const ReservationLayout: React.FC<ReservationLayoutProps> = ({ children }) => {
  return (
    <>
      <main className='flex-1 overflow-y-auto p-4'>{children}</main>
    </>
  );
};
