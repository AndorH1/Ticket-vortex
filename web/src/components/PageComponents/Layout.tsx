import React, { PropsWithChildren } from 'react';
import { Footer, SideBar } from '../shared';
import { NavBar } from '../shared/NavBar/NavBar';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='flex flex-col h-screen'>
      <NavBar />
      <div className='flex flex-1'>
        <SideBar />
        <main className='flex-1  p-4'>{children}</main>
      </div>
      <Footer />
    </div>
  );
};
