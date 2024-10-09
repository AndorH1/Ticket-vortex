import { Image as ImageGL } from '@gluestack-ui/themed';
import React from 'react';
import { ImageProps } from '../../utils/globalTypes';

export const Image: React.FC<ImageProps> = ({ url, alt, size, style }) => {
  return <ImageGL source={url} alt={alt} size={size} style={style} />;
};
