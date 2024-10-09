import { View as ViewGL } from '@gluestack-ui/themed';
import React from 'react';
import { ViewProps } from '../../utils/globalTypes';

export const View: React.FC<ViewProps> = ({ children, style }) => {
  return <ViewGL style={style}>{children}</ViewGL>;
};
