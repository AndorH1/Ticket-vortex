import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import { Image, Text, VStack } from '../../atom';
import { ImageProps } from '../../utils/globalTypes';

interface HeaderProfileProps {
  avatarImage: ImageProps;
  userName: string;
  verified?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const HeaderProfile: React.FC<HeaderProfileProps> = ({
  avatarImage,
  userName,
  containerStyle,
  textStyle,
  verified,
}) => {
  return (
    <VStack style={containerStyle}>
      {verified ? <Text text='VERIFIED' /> : <Text text='IS NOT VERIFIED' />}
      <Image
        url={avatarImage.url}
        alt={avatarImage.alt}
        size={avatarImage.size}
        style={avatarImage.style}
      />
      <Text text={userName} style={textStyle} />
    </VStack>
  );
};
