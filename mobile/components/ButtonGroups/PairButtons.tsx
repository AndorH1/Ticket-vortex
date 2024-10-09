import React from 'react';
import { Button, HStack } from '../../atom';
import { ButtonProps } from '../../utils/globalTypes';
import { StyleProp, ViewStyle } from 'react-native';

interface PairButtonsProps {
  firstButton: ButtonProps;
  secondButton: ButtonProps;
  style?: StyleProp<ViewStyle>;
}

export const PairButtons: React.FC<PairButtonsProps> = ({ style, firstButton, secondButton }) => {
  return (
    <HStack style={style}>
      <Button
        buttonName={firstButton.buttonName}
        onPress={firstButton.onPress}
        style={firstButton.style}
      />
      <Button
        buttonName={secondButton.buttonName}
        onPress={secondButton.onPress}
        style={secondButton.style}
      />
    </HStack>
  );
};
