import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, KeyboardAvoidingView, ScrollView, VStack } from '../atom';
import { InputRegister, useToast } from '../components';
import { isIOS } from '../utils/utils';
import { colors } from '../styles/colors';
import { useTranslation } from 'react-i18next';
import { UserRegister, UserRegisterSchema } from '../services/schemas/UserSchema';
import { ZodError, ZodIssue } from 'zod';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { StackNavigatorProps } from '../navigation/types';
import { useRegister } from '../services/axios/authClient';

export const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const { t } = useTranslation();
  const toast = useToast();
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorProps>>();
  const { register } = useRegister();

  const clear = () => {
    setLastName('');
    setFirstName('');
    setUsername('');
    setEmail('');
    setPassword('');
    setCheckPassword('');
  };

  const handleRegistration = async () => {
    const newUser: UserRegister = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
    };

    try {
      UserRegisterSchema.parse(newUser);
      if (password != checkPassword) {
        const issues: ZodIssue[] = [
          {
            message: 'Passwords do not match',
            path: ['password'],
            code: 'custom',
          },
        ];
        throw new ZodError(issues);
      }
      await register(newUser);
      navigation.navigate('Root', { screen: 'Login' });
      clear();

      toast.showToast({
        action: 'success',
        text: t('successfullyRegistered'),
        title: t('register'),
        variant: 'solid',
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage: string = t(error.issues[0].message);

        toast.showToast({
          action: 'error',
          text: errorMessage ? errorMessage : t('somethingWentWrong'),
          title: t('register'),
          variant: 'solid',
        });
      } else {
        console.error(error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={registerStyle.keyboardAvoidFlex}
      keyboardVerticalOffset={isIOS ? 40 : 0}
    >
      <ScrollView>
        <VStack style={registerStyle.stack}>
          <InputRegister
            label={t('firstName')}
            placeholder='ex: John '
            value={firstName}
            setValue={(firstName) => setFirstName(firstName)}
          />

          <InputRegister
            label={t('lastName')}
            placeholder='ex: Doe '
            value={lastName}
            setValue={(lastName) => setLastName(lastName)}
          />

          <InputRegister
            label={t('username')}
            placeholder='ex: Johny123 '
            value={username}
            setValue={(username) => setUsername(username)}
          />

          <InputRegister
            label={t('email')}
            placeholder='ex: Johny123@email.com '
            value={email}
            setValue={(email) => setEmail(email)}
          />

          <InputRegister
            label={t('password')}
            placeholder={t('password')}
            value={password}
            setValue={(password) => setPassword(password)}
            type='password'
          />

          <InputRegister
            label={t('confirmPassword')}
            placeholder={t('repeatYourPassword.')}
            value={checkPassword}
            setValue={(checkPassword) => setCheckPassword(checkPassword)}
            type='password'
          />

          <Button
            buttonName={t('register')}
            style={registerStyle.button}
            onPress={handleRegistration}
          />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const registerStyle = StyleSheet.create({
  button: {
    alignSelf: 'center',
  },
  stack: {
    borderRadius: 10,
    padding: 4,
    backgroundColor: colors.white,
    margin: 4,
    paddingHorizontal: 16,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 4,
    marginTop: 4,
  },
  text: {
    fontSize: 30,
  },
  keyboardAvoidFlex: {
    flex: 1,
  },
});
