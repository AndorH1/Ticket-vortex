import React, { ReactNode } from 'react';
import { Layout } from '../components/PageComponents/Layout';
import { EventsLayout } from '../components/PageComponents/Layouts/EventsLayout/EventsLayout';

interface EventsPageProps {
  children: ReactNode;
}

export const EventsPage: React.FC<EventsPageProps> = ({ children }) => {
  return (
    <Layout>
      <EventsLayout>{children}</EventsLayout>
    </Layout>
  );
};
