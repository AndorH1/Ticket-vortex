import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { HeaderProfile, InfoProfile } from '../components';
import { ImageProps } from '../utils/globalTypes';
import { VStack } from '../atom';
import { User } from '../services/schemas/UserSchema';
import { getUserById } from '../services/axios/userClient';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { StackNavigatorProps } from '../navigation/types';
import { phantomPhotos } from '../utils/utils';

type Props = NativeStackScreenProps<StackNavigatorProps, "OtherProfile">;

export const OtherProfile: React.FC<Props> = ({route}) => {
  const otherUserId = route.params.userID;
  const [user, setUser] = useState<User | null>(null);
  const profilePicture: ImageProps = {
    url: user?.photo
      ? user.photo
      : phantomPhotos.profile,
    alt: 'alt',
    style: style.image,
    size: '2xl',
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(otherUserId);
        setUser(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [otherUserId]);

  return (
    <>
      {user ? (
        <VStack style={style.container}>
          <HeaderProfile
            userName={user.username}
            avatarImage={profilePicture}
            verified={user.verified}
            textStyle={style.text}
            containerStyle={style.container}
          />
          <InfoProfile
            firstName={user.firstName}
            lastName={user.lastName}
            country={user.country}
            city={user.city}
            email={user.email}
            phoneNumber={user.phoneNumber}
            role={user.role}
            address={user.address}
          />
        </VStack>
      ) : null}
    </>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 30,
    alignSelf: 'center',
    marginTop: 16,
  },
  image: {
    borderRadius: 200,
  },
  button: {
    margin: 6,
  },
});
