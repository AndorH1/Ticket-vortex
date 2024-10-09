import React from 'react';
import { Modal as ModalRN, StyleProp, ViewStyle } from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>
}

export const Modal: React.FC<ModalProps> = ({ visible, onClose, children, style }) => {
  return (
    <ModalRN visible={visible} onRequestClose={onClose} style={style}>
      {children}
    </ModalRN>
  );
};
