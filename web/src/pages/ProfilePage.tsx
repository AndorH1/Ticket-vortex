import React from 'react';
import { Layout } from '../components/PageComponents/Layout';
import { Profile } from '../components/PageComponents/Layouts/ProfileLayout/Profile';

export const ProfilePage: React.FC = () => {
  return (
    <Layout>
      <Profile />
    </Layout>
  );
};

export default ProfilePage;
