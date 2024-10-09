import { Text as TextGL } from '@gluestack-ui/themed';
import React from 'react';
import { TextProps } from '../../utils/globalTypes';

export const Text: React.FC<TextProps> = ({ text, style }) => {
  return <TextGL style={style}>{text}</TextGL>;
};
