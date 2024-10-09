import React, { ReactNode } from 'react';
import { Layout } from '../components/PageComponents/Layout';
import { TicketLayout } from '../components/PageComponents/Layouts/TicketsLayout/TicketsLayout';

interface TicketLayoutProps {
  children: ReactNode;
}

export const TicketsPage: React.FC<TicketLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <TicketLayout>{children}</TicketLayout>
    </Layout>
  );
};
