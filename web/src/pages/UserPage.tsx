import React, { ReactNode } from 'react';
import { Layout } from '../components/PageComponents/Layout';
import { UserLayout } from '../components/PageComponents/Layouts/UsersLayout/UserLayout';
interface UserPageProps {
  children: ReactNode;
}

export const UserPage: React.FC<UserPageProps> = ({ children }) => {
  return (
    <Layout>
      <UserLayout>{children}</UserLayout>
    </Layout>
  );
};
