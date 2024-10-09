import React from 'react';
import { Event } from '../../services/schemas/EventSchema';
import { HStack, Image, Text, VStack } from '../../atom';
import { StyleSheet } from 'react-native';
import { formatDate } from '../../utils/utils';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <VStack style={styles.container}>
      <HStack style={styles.middleContainer}>
        <Image url={event.photo} alt='eventPhoto' size='lg' style={styles.image} />
        <VStack style={styles.innerContainer}>
          <Text text={event.name} style={styles.eventName} />
          <Text text={formatDate(event.startDate)} />
          <Text text={event.location.address} />
        </VStack>
      </HStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  image: {
    borderRadius: 32,
  },
  middleContainer: {
    justifyContent: 'space-evenly',
  },
  innerContainer: {
    alignItems: 'center',
  },
  eventName: {
    fontSize: 24,
  },
});
