import React, { ReactNode } from 'react';
import { Layout } from '../components/PageComponents/Layout';
import { ReservationLayout } from '../components/PageComponents/Layouts/ReservationLayout/ReservationLayout';

interface ReservationLayoutProps {
  children: ReactNode;
}

export const ReservationPage: React.FC<ReservationLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <ReservationLayout>{children}</ReservationLayout>
    </Layout>
  );
};
