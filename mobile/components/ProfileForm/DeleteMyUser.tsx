import React from 'react';
import { Modal, Text, VStack, HStack, Button } from '../../atom';
import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { useTranslation } from 'react-i18next';

interface DeleteMyUserProps {
  visible: boolean;
  onConfirm: () => void;
  onClose(): void;
}

export const DeleteMyUser: React.FC<DeleteMyUserProps> = ({ visible, onConfirm, onClose }) => {
  const { t } = useTranslation();
  return (
    <Modal visible={visible} onClose={onClose}>
      <VStack style={styles.innerContainer}>
        <Text text={t('permanentDeleteWarning')} style={styles.text} />
        <Text text={t('doYouWantIt')} style={styles.text} />
        <HStack style={styles.buttonGroup}>
          <Button buttonName={t('yes')} onPress={onConfirm} style={styles.buttonYes} />
          <Button buttonName={t('no')} onPress={onClose} style={styles.buttonNo} />
        </HStack>
      </VStack>
    </Modal>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    alignItems: 'center',
    marginVertical: 4,
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  buttonYes: {
    backgroundColor: colors.red,
    color: colors.white,
    alignSelf: 'center',
    marginHorizontal: 8,
  },
  buttonNo: {
    marginHorizontal: 8,
  },
  buttonGroup: {
    marginVertical: 16,
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
    color: colors.red,
    textAlign: 'center',
  },
});
