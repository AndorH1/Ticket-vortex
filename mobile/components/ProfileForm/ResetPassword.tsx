import React from 'react';
import { Button, HStack, Text } from '../../atom';
import { ButtonProps, HVStackProps, TextProps } from '../../utils/globalTypes';
import { StyleSheet } from 'react-native';

interface ResetPasswordProps {
  hstack: HVStackProps;
  button: ButtonProps;
  text: TextProps;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({ hstack, text, button }) => {
  return (
    <HStack space={hstack.space} style={styles.container}>
      <Text text={text.text} style={text.style} />
      <Button buttonName={button.buttonName} onPress={button.onPress} style={styles.button} />
    </HStack>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  button: {
    marginRight: '10%',
  },
});
