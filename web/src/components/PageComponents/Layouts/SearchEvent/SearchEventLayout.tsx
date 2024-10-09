import React, { PropsWithChildren } from 'react';
interface SearchLayoutProps {}
export const SearchEventLayout: React.FC<PropsWithChildren<SearchLayoutProps>> = ({ children }) => {
  return (
    <>
      <main className='flex-1 overflow-y-auto p-4'>{children}</main>
    </>
  );
};
