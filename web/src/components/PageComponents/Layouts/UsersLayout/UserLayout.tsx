import React, { PropsWithChildren } from "react";

interface UserLayoutProps extends PropsWithChildren {}
export const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <>
      <main className="flex-1 overflow-y-auto p-4">{children}</main>
    </>
  );
};
