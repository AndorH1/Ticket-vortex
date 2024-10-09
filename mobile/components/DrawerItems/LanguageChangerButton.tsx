import { DrawerItem } from '@react-navigation/drawer';
import React from 'react';

interface LanguageChangerButtonProps {
  label: string;
  defaultVisibility?: boolean;
  setVisible: (flag: boolean) => void;
}
export const LanguageChangerButton: React.FC<LanguageChangerButtonProps> = ({
  label,
  setVisible,
  defaultVisibility = false,
}) => {
  return <DrawerItem label={label} onPress={() => setVisible(defaultVisibility)}></DrawerItem>;
};
