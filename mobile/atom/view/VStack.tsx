import { VStack as VStackGL } from '@gluestack-ui/themed';
import React from 'react';
import { HVStackProps } from '../../utils/globalTypes';

export const VStack: React.FC<HVStackProps> = ({ style, children, space }) => {
  return (
    <VStackGL style={style} space={space}>
      {children}
    </VStackGL>
  );
};
