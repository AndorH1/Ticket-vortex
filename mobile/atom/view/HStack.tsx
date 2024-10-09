import { HStack as HStackGL } from '@gluestack-ui/themed';
import React from 'react';
import { HVStackProps } from '../../utils/globalTypes';

export const HStack: React.FC<HVStackProps> = ({ style, children, space }) => {
  return (
    <HStackGL style={style} space={space}>
      {children}
    </HStackGL>
  );
};
