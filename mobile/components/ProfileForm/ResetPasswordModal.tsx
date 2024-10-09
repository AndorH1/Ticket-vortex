import React, { useState } from 'react';
import { HStack, Modal, Text } from '../../atom';
import { InputRegister } from '../RegistrationForm';
import { PairButtons } from '../ButtonGroups';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useToast } from '../Toasts/showToast';
import { updatePassword } from '../../services/axios/userClient';

interface ResetPasswordModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ visible, onClose }) => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const { t } = useTranslation();
  const toast = useToast();

  const handleSave = async () => {
    if (password1 !== password2 || password1.length < 6 || password2.length < 6) {
      return alert(t('passwordMinLengthOrDoesNotMatch'));
    }

    try {
      const response = await updatePassword(oldPassword, password1);

      if (response === 200) {
        toast.showToast({
          action: 'success',
          text: t('passwordChanged'),
          title: t('password'),
          variant: 'solid',
        });
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setPassword1('');
    setPassword2('');
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose} style={styles.container}>
      <Text text='Change Password' style={styles.text} />
      <InputRegister
        type='password'
        label='oldPassword'
        value={oldPassword}
        setValue={setOldPassword}
      />
      <InputRegister
        type='password'
        label='newPassword'
        value={password1}
        setValue={setPassword1}
      />
      <InputRegister
        type='password'
        label='repeatPassword'
        value={password2}
        setValue={setPassword2}
      />
      <HStack style={styles.innerContainer}>
        <PairButtons
          firstButton={{ buttonName: 'save', onPress: handleSave, style: styles.button }}
          secondButton={{ buttonName: 'cancel', onPress: handleClose, style: styles.button }}
        />
      </HStack>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
  button: {
    marginHorizontal: 8,
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
});
