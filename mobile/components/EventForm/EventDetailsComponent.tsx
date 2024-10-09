import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { EventDetails } from '../../services/schemas/EventSchema';
import { colors } from '../../styles/colors';
import { Button, Image, Text, VStack } from '../../atom';
import { EventOnMap } from './EventOnMap';

interface EventDetailsComponentProps {
  event: EventDetails;
}

export const EventDetailsComponent: React.FC<EventDetailsComponentProps> = ({ event }) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <EventOnMap location={event.location} visible={visible} setVisible={setVisible} />
      <VStack style={styles.container}>
        <Image url={event.photo} style={styles.image} alt='EventDetailsPhoto' size='2xl' />
        <Text style={styles.title} text={event.name} />
        <Text style={styles.description} text={event.description} />
        <VStack style={styles.detailsContainer}>
          <Text style={styles.detail} text={`Location: ${event.location.address}`} />
          <Text
            style={styles.detail}
            text={`Start Date: ${new Date(event.startDate).toLocaleString()}`}
          />
          <Text
            style={styles.detail}
            text={`End Date: ${new Date(event.endDate).toLocaleString()}`}
          />
          <Text style={styles.detail} text={`Event Type: ${event.type}`} />
          <Text
            style={styles.detail}
            text={`Available Capacity: ${event.availableCapacity}/${event.maxCapacity}`}
          />
        </VStack>
        <Button buttonName='Show on map' style={styles.button} onPress={() => setVisible(true)} />
      </VStack>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 3,
    margin: 16,
  },
  image: {
    borderRadius: 8,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    marginTop: 8,
    color: colors.gray,
  },
  detailsContainer: {
    marginTop: 16,
  },
  detail: {
    fontSize: 16,
    marginTop: 4,
  },
  button: {
    marginTop: 16,
    alignSelf: 'center',
  },
});
