import React from 'react';
import { Button, Modal, Text } from '../../atom';
import { Location } from '../../services/schemas/EventSchema';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';

interface EventOnMapProps {
  location: Location;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const EventOnMap: React.FC<EventOnMapProps> = ({ location, visible, setVisible }) => {
  return (
    <Modal visible={visible} onClose={() => setVisible(false)}>
      {location.latitude && location.longitude ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        </MapView>
      ) : (
        <Text text='No location provided' style={styles.text} />
      )}
      <Button buttonName='Close' onPress={() => setVisible(false)} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    height: '94%',
    width: '100%',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
