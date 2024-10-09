import { StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';
import React from 'react';
import { EyeIcon, EyeOffIcon, Icon } from '@gluestack-ui/themed';
import { IconSize, InputTextType } from '../utils/globalTypes';
import { Pressable } from '../atom';

interface EyeIconOpenCloseProps {
  onPress: (event: GestureResponderEvent) => void;
  iconSize?: IconSize;
  textType?: InputTextType;
  style?: StyleProp<ViewStyle>;
}

export const EyeIconOpenClose: React.FC<EyeIconOpenCloseProps> = ({
  iconSize,
  onPress: onPress,
  style,
  textType = 'text',
}) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <Icon as={textType === 'password' ? EyeOffIcon : EyeIcon} size={iconSize} />
    </Pressable>
  );
};
