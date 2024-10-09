import { Button as ButtonGL, ButtonText } from '@gluestack-ui/themed';
import React from 'react';
import { ButtonProps } from '../../utils/globalTypes';

export const Button: React.FC<ButtonProps> = ({ buttonName, onPress, style, size }) => {
  return (
    <ButtonGL onPress={onPress} style={style} size={size}>
      <ButtonText>{buttonName}</ButtonText>
    </ButtonGL>
  );
};
