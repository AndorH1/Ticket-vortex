import { KeyboardAvoidingView as KeyboardAvoidingViewGL } from '@gluestack-ui/themed/build/components';
import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

interface KeyboardAvoidingViewProps {
  keyboardVerticalOffset?: number;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export const KeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps> = ({
  style,
  children,
  keyboardVerticalOffset,
}) => {
  return (
    <KeyboardAvoidingViewGL style={style} keyboardVerticalOffset={keyboardVerticalOffset}>
      {children}
    </KeyboardAvoidingViewGL>
  );
};
