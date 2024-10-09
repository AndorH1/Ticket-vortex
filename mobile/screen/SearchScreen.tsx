import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { getSearchTermUser } from '../services/axios/userClient';
import { UserList } from '../utils/globalTypes';
import { User } from '../services/schemas/UserSchema';
import { ProfileSearch, ProfileSearchCard } from '../components';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from '../atom';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { StackNavigatorProps } from '../navigation/types';

export const SearchScreen: React.FC = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<UserList>([]);
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorProps>>();

  const handleChange = async (text: string) => {
    const response = await getSearchTermUser(text);
    setUsers(response);
  };

  const renderUser = ({ item: user }: { item: User; index: number }) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('OtherProfile', { userID: user.id });
        }}
      >
        <ProfileSearchCard
          hStack={{ style: styles.renderHStackStyle }}
          vStack={{ style: styles.renderVStackStyle }}
          image={{
            url: user.photo,
            alt: 'profilePicture',
            size: 'md',
            style: styles.renderImageStyle,
          }}
          username={{ text: user.username, style: styles.userNameStyle }}
          commonName={{ text: `${user.firstName} ${user.lastName}`, style: styles.commonNameStyle }}
        />
      </Pressable>
    );
  };

  return (
    <ProfileSearch
      view={{}}
      input={{ placeholder: t('search'), size: 'md', onChangeText: (text) => handleChange(text) }}
      flatList={{ data: users, renderItem: renderUser }}
    />
  );
};

const styles = StyleSheet.create({
  renderHStackStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  renderVStackStyle: {},
  renderImageStyle: {
    borderRadius: 50,
    marginRight: 10,
  },
  userNameStyle: {
    fontSize: 16,
  },
  commonNameStyle: {
    fontSize: 16,
  },
});
