import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { DrawerNavigation } from './DrawerNavigation';
import { ProfileEdit } from '../screen/ProfileEdit';
import { useTranslation } from 'react-i18next';
import { StackNavigatorProps } from './types';
import { SearchScreen } from '../screen/SearchScreen';
import { EventDetailsScreen } from '../screen/EventDetailsScreen';
import { OtherProfile } from '../screen/OtherProfile';

const Stack = createStackNavigator<StackNavigatorProps>();

export const StackNavigator = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen name='Root' component={DrawerNavigation} options={rootOptions} />
      <Stack.Screen
        name='ProfileEdit'
        component={ProfileEdit}
        options={{ ...detailOptions, title: t('editYourProfile') }}
      />
      <Stack.Screen
        name='EventDetailsScreen'
        component={EventDetailsScreen}
        options={{ ...detailOptions, title: t('eventDetails') }}
      />
      <Stack.Screen
        name='SearchScreen'
        component={SearchScreen}
        options={{ ...detailOptions, title: t('searchScreen') }}
      />
      <Stack.Screen
        name='OtherProfile'
        component={OtherProfile}
        options={{ ...detailOptions, title: t('otherProfile') }}
      />
    </Stack.Navigator>
  );
};

const rootOptions: StackNavigationOptions = {
  headerShown: false,
};

const detailOptions: StackNavigationOptions = {
  headerShown: true,
  headerBackTitleVisible: false,
};
