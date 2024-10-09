import React from 'react';
import { HStack, VStack, Text, Image } from '../../atom';
import { ProfileSearchCardProps } from '../../utils/globalTypes';

export const ProfileSearchCard: React.FC<ProfileSearchCardProps> = ({
  hStack,
  vStack,
  image,
  username,
  commonName,
}) => {
  return (
    <HStack space={hStack.space} style={hStack.style}>
      {image.url ? <Image url={image.url} style={image.style} alt={image.alt} size={image.size} /> : null}
      <VStack space={vStack.space} style={vStack.style}>
        <Text style={username.style} text={username.text} />
        <Text style={{ fontSize: 16 }} text={commonName.text} />
      </VStack>
    </HStack>
  );
};
