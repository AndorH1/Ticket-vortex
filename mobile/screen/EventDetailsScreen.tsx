import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { StackNavigatorProps } from '../navigation/types';
import { getEventById } from '../services/axios/eventClient';
import { EventDetails } from '../services/schemas/EventSchema';
import { EventDetailsComponent } from '../components';
import { ScrollView } from '../atom';

type EventDetailsScreenProps = NativeStackScreenProps<StackNavigatorProps, 'EventDetailsScreen'>;

export const EventDetailsScreen: React.FC<EventDetailsScreenProps> = ({ route }) => {
  const eventId = route.params.eventId;
  const [currentEvent, setCurrentEvent] = useState<EventDetails | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventDetails = await getEventById(eventId);
        setCurrentEvent(eventDetails);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  return (
    <ScrollView>{currentEvent ? <EventDetailsComponent event={currentEvent} /> : null}</ScrollView>
  );
};
