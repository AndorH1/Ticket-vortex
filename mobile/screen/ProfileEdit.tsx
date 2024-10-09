import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { VStack, Text, ScrollView, KeyboardAvoidingView, Button } from '../atom';
import { useTranslation } from 'react-i18next';
import { useCurrentUserStore } from '../store/UserStore';
import { InputRegister, PairButtons, ResetPassword, useToast } from '../components';
import { isIOS, phantomPhotos, StatusCodes } from '../utils/utils';
import { colors } from '../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { StackNavigatorProps } from '../navigation/types';
import { deleteMyUser, updateUser } from '../services/axios/userClient';
import { ZodError, ZodIssue } from 'zod';
import { UserSchema } from '../services/schemas/UserSchema';
import { ResetPasswordModal } from '../components/ProfileForm/ResetPasswordModal';
import { DeleteMyUser } from '../components/ProfileForm/DeleteMyUser';
import { useLogout } from '../services/axios/authClient';
import { ProfilePicturePicker } from '../components/ProfilePicturePicker';

export const ProfileEdit: React.FC = () => {
  const { t } = useTranslation();
  const { user, setUser } = useCurrentUserStore();
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorProps>>();
  const { showToast } = useToast();
  const [passwordModalVisible, setPasswordModalVisible] = useState<boolean>(false);
  const [deleteUserModalVisible, setDeleteUserModalVisible] = useState<boolean>(false);
  const { logout } = useLogout();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
    city: user?.city || '',
    country: user?.country || '',
    photo: user?.photo || phantomPhotos.profile,
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((oldForm) => ({ ...oldForm, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (user) {
        const updatedUser = { ...user, ...formData };
        UserSchema.parse(updatedUser);
        const status = await updateUser(updatedUser);

        if (status && StatusCodes.OK > status && status >= StatusCodes.MULTIPLE_CHOICES) {
          const issues: ZodIssue[] = [
            {
              message: 'Update failed',
              path: ['updateUser'],
              code: 'custom',
            },
          ];
          throw new ZodError(issues);
        }

        if (status && status >= StatusCodes.OK && status < StatusCodes.MULTIPLE_CHOICES) {
          setUser(updatedUser);
          if (navigation.canGoBack()) {
            navigation.goBack();

            showToast({
              action: 'success',
              text: t('profileModified'),
              title: t('profileModified'),
              variant: 'solid',
            });
          }
        }
      }
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(error);
      }
      console.error(error);
      showToast({
        action: 'error',
        text: t('somethingWentWrong'),
        title: t('profileModified'),
        variant: 'solid',
      });
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await deleteMyUser();
      if (response?.status === 200) {
        navigation.navigate('Root', { screen: 'Home' });
        logout();
        showToast({
          action: 'success',
          text: t('userDeleted'),
          title: t('userDeleted'),
          variant: 'solid',
        });
      }
    } catch (error) {
      console.error(error);
      showToast({
        action: 'error',
        text: t('somethingWentWrong'),
        title: t('profileModified'),
        variant: 'solid',
      });
    }
  };

  const handleCancel = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <>
      {user ? (
        <KeyboardAvoidingView
          style={styles.keyboardAvoidFlex}
          keyboardVerticalOffset={isIOS ? 40 : 0}
        >
          <ScrollView>
            <ResetPasswordModal
              visible={passwordModalVisible}
              onClose={() => setPasswordModalVisible(false)}
            />
            <DeleteMyUser
              visible={deleteUserModalVisible}
              onConfirm={handleDeleteUser}
              onClose={() => setDeleteUserModalVisible(false)}
            />
            <VStack style={styles.stack}>
              <InputRegister
                label={`${t('firstName')}:`}
                value={formData.firstName}
                setValue={(text) => handleInputChange('firstName', text)}
              />
              <InputRegister
                label={`${t('lastName')}:`}
                value={formData.lastName}
                setValue={(text) => handleInputChange('lastName', text)}
              />
              <InputRegister
                label={`${t('username')}:`}
                value={formData.username}
                setValue={(text) => handleInputChange('username', text)}
              />
              <InputRegister
                label={`${t('email')}:`}
                value={formData.email}
                setValue={(text) => handleInputChange('email', text)}
              />
              <InputRegister
                label={`${t('phoneNumber')}:`}
                value={formData.phoneNumber}
                setValue={(text) => handleInputChange('phoneNumber', text)}
              />
              <InputRegister
                label={`${t('address')}:`}
                value={formData.address}
                setValue={(text) => handleInputChange('address', text)}
              />
              <InputRegister
                label={`${t('city')}:`}
                value={formData.city}
                setValue={(text) => handleInputChange('city', text)}
              />
              <InputRegister
                label={`${t('country')}:`}
                value={formData.country}
                setValue={(text) => handleInputChange('country', text)}
              />
              <ResetPassword
                hstack={{}}
                button={{ buttonName: t('change'), onPress: () => setPasswordModalVisible(true) }}
                text={{ text: t('password') }}
              />
              <ProfilePicturePicker />
              <Button
                buttonName={t('userDeleteButton')}
                onPress={() => setDeleteUserModalVisible(true)}
                style={styles.buttonDelete}
              />
            </VStack>
            <PairButtons
              style={styles.saveCancelContainer}
              firstButton={{
                buttonName: t('save'),
                onPress: async () => await handleSave(),
                style: styles.saveCancelButtons,
              }}
              secondButton={{
                buttonName: t('cancel'),
                onPress: () => handleCancel(),
                style: styles.saveCancelButtons,
              }}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      ) : (
        <VStack style={styles.container}>
          <Text text={t('noUserDataAvailable')} />
        </VStack>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  saveCancelButtons: {
    marginHorizontal: 8,
  },
  saveCancelContainer: {
    marginVertical: 8,
    alignSelf: 'center',
  },
  buttonDelete: {
    backgroundColor: colors.red,
    color: colors.white,
    alignSelf: 'center',
    marginVertical: 8,
  },
});
