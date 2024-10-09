import { Pressable as PressableGL } from '@gluestack-ui/themed';
import React, { ReactNode } from 'react';
import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';

interface PressableProps {
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export const Pressable: React.FC<PressableProps> = ({ onPress, style, children }) => {
  return (
    <PressableGL onPress={onPress} style={style}>
      {children}
    </PressableGL>
  );
};
