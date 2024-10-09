import { DrawerItem } from '@react-navigation/drawer';
import React from 'react';

interface LogoutButtonProps {
  label: string;
  onPress: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ label, onPress }) => {
  return <DrawerItem label={label} onPress={() => onPress()}></DrawerItem>;
};
