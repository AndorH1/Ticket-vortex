import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Pressable } from '../pressable';

interface PressableAsIconProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  icon?: React.ComponentType<any>;
}

export const PressableAsIcon: React.FC<PressableAsIconProps> = ({ onPress, style, icon: Icon }) => {
  return (
    <Pressable onPress={onPress} style={style}>
      {Icon ? <Icon /> : null}
    </Pressable>
  );
};
