import React from 'react';
import { Layout } from '../components/PageComponents/Layout';
import { Dashboard } from '../components/PageComponents/Dashboard/Dashboard';
export const HomePage: React.FC = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};
