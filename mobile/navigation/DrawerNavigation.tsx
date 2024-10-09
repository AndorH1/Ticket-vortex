import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { Home } from '../screen/Home';
import React, { useEffect, useState } from 'react';
import { Login } from '../screen/Login';
import { Register } from '../screen/Register';
import { LanguageChanger, LanguageChangerButton, LogoutButton } from '../components';
import { useTranslation } from 'react-i18next';
import { Profile } from '../screen/Profile';
import { DrawerNavigationProps, StackNavigatorProps } from './types';
import { useCurrentUserStore } from '../store/UserStore';
import { useLogout } from '../services/axios/authClient';
import { Events } from '../screen/Events';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { icons } from '../utils/icons';
import { PressableAsIcon } from '../atom';
import { useTokenStore } from '../store/TokenStore';
import { setAuthToken } from '../services/axios/api';

const Drawer = createDrawerNavigator<DrawerNavigationProps>();

export function DrawerNavigation() {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const { user } = useCurrentUserStore();
  const { token } = useTokenStore();
  const { logout } = useLogout();
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorProps>>();

  useEffect(() => {
    if (token){
      setAuthToken(token);
    }
  }, [token]);

  return (
    <>
      {user && token ? (
        <Drawer.Navigator
          initialRouteName='Home'
          screenOptions={() => ({
            headerRight: () => (
              <PressableAsIcon
                onPress={() => {
                  navigation.navigate('SearchScreen');
                }}
                icon={icons.SearchIcon}
                style={{ marginRight: 16 }}
              />
            ),
          })}
          drawerContent={(props: DrawerContentComponentProps) => {
            return (
              <>
                <LanguageChanger
                  language='en'
                  visible={visible}
                  onClose={() => setVisible(false)}
                ></LanguageChanger>
                <DrawerContentScrollView {...props}>
                  <DrawerItemList {...props} />
                  <LanguageChangerButton
                    label={t('language')}
                    setVisible={() => setVisible(true)}
                  />
                  <LogoutButton
                    label={t('logout')}
                    onPress={() => {
                      logout();
                    }}
                  />
                </DrawerContentScrollView>
              </>
            );
          }}
        >
          <Drawer.Screen name='Home' component={Home} options={{ title: t('home') }} />
          <Drawer.Screen name='Events' component={Events} options={{ title: t('events') }} />
          <Drawer.Screen name='Profile' component={Profile} options={{ title: t('profile') }} />
        </Drawer.Navigator>
      ) : (
        <>
          <Drawer.Navigator initialRouteName='Login'>
            <Drawer.Screen name='Home' component={Home} options={{ title: t('home') }} />
            <Drawer.Screen name='Events' component={Events} options={{ title: t('events') }} />
            <Drawer.Screen name='Login' component={Login} options={{ title: t('login') }} />
            <Drawer.Screen
              name='Registration'
              component={Register}
              options={{ title: t('registration') }}
            />
          </Drawer.Navigator>
        </>
      )}
    </>
  );
}
