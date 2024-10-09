import React from 'react';
import { Heading as HeadingGL } from '@gluestack-ui/themed/build/components';
import { StyleProp, TextStyle } from 'react-native';

interface HeadingProps {
  text: string;
  style?: StyleProp<TextStyle>;
}

export const Heading: React.FC<HeadingProps> = ({ text, style }) => {
  return <HeadingGL style={style}>{text}</HeadingGL>;
};
