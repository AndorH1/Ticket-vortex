import React from 'react';
import { VStack, Text } from '../../atom';
import { StyleSheet } from 'react-native';

interface InfoProfileProps {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber: string;
  country: string;
  city: string;
  address: string;
}

export const InfoProfile: React.FC<InfoProfileProps> = ({
  address,
  city,
  country,
  email,
  firstName,
  lastName,
  phoneNumber,
  role,
}) => {
  return (
    <VStack style={styles.container}>
      <Text text={`${firstName} ${lastName}`} />
      <Text text={`${email}`} />
      <Text text={`${phoneNumber}`} />
      <Text text={`${city}, ${country}`} />
      <Text text={`${address}`} />
      <Text text={`${role}`} />
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
