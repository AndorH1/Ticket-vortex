import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, KeyboardAvoidingView, VStack } from '../atom';
import { InputLogin, useToast } from '../components';
import { isIOS } from '../utils/utils';
import { colors } from '../styles/colors';
import { useTranslation } from 'react-i18next';
import { useLogin } from '../services/axios/authClient';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { StackNavigatorProps } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { useCurrentUserStore } from '../store/UserStore';
import { useTokenStore } from '../store/TokenStore';
import { saveUser } from '../utils/currentUserStorage';
import { saveToken } from '../utils/currentTokenStorage';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorProps>>();
  const toast = useToast();
  const { login } = useLogin();
  const { setUser } = useCurrentUserStore();
  const { setToken } = useTokenStore();

  const handleLogin = async () => {
    const { success, user, token } = await login(username, password);

    if (success && user && token) {
      try {
        await saveUser(user);
        await saveToken(token);
        setUser(user);
        setToken(token);

        if (navigation.canGoBack()) {
          navigation.goBack();
        }

        toast.showToast({
          action: 'success',
          text: t('successfulLogin'),
          title: t('login'),
          variant: 'solid',
        });
      } catch (error) {
        console.error('Failed to save user and token:', error);
      }
    } else {
      toast.showToast({
        action: 'error',
        text: t('checkYourUsernameOrPassword'),
        title: t('login'),
        variant: 'solid',
      });
    }
  };

  return (
    <KeyboardAvoidingView style={loginStyle.container} keyboardVerticalOffset={isIOS ? 40 : 0}>
      <VStack space='md' style={loginStyle.stack}>
        <InputLogin
          headerName={t('username')}
          type='text'
          setText={(email) => setUsername(email)}
          placeholder={t('username')}
        />

        <InputLogin
          type='password'
          setText={(password) => setPassword(password)}
          headerName={t('password')}
          placeholder={t('password')}
        />

        <Button style={loginStyle.button} buttonName={t('login')} onPress={handleLogin} />
      </VStack>
    </KeyboardAvoidingView>
  );
};

const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 2,
  },
  button: {
    alignSelf: 'center',
  },
  stack: {
    alignItems: 'stretch',
    borderRadius: 10,
    padding: 4,
    backgroundColor: colors.white,
    margin: 4,
    paddingHorizontal: 16,
  },
});
