import React, { useEffect, useState } from 'react';
import { EventDetailsComponent } from '../components';
import { EventDetails } from '../services/schemas/EventSchema';
import { getNextEvent } from '../services/axios/eventClient';
import { ScrollView } from '../atom';

export const Home: React.FC = () => {
  const [currentEvent, setCurrentEvent] = useState<EventDetails | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getNextEvent();
        setCurrentEvent(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <ScrollView>{currentEvent ? <EventDetailsComponent event={currentEvent} /> : null}</ScrollView>
  );
};
