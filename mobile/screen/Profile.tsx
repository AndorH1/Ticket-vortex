import React from 'react';
import { StyleSheet } from 'react-native';
import { HeaderProfile, InfoProfile } from '../components';
import { ImageProps } from '../utils/globalTypes';
import { useCurrentUserStore } from '../store/UserStore';
import { VStack, Button } from '../atom';
import { useNavigation } from '@react-navigation/native';
import { StackNavigatorProps } from '../navigation/types';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { useTranslation } from 'react-i18next';
import { phantomPhotos } from '../utils/utils';

export const Profile: React.FC = () => {
  const { user } = useCurrentUserStore();
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorProps>>();
  const { t } = useTranslation();
  const profilePicture: ImageProps = {
    url: user?.photo
      ? user.photo
      : phantomPhotos.profile,
    alt: 'alt',
    style: style.image,
    size: '2xl',
  };

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
          <Button
            style={style.button}
            buttonName={t('editYourProfile')}
            onPress={() => navigation.navigate('ProfileEdit')}
          ></Button>
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
