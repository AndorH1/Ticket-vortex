import { ScrollView as ScrollViewGL } from '@gluestack-ui/themed';
import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

interface ScrollViewProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export const ScrollView: React.FC<ScrollViewProps> = ({ style, children }) => {
  return <ScrollViewGL style={style}>{children}</ScrollViewGL>;
};
