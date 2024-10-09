import { ToastDescription, Toast as ToastGL, ToastTitle, VStack } from '@gluestack-ui/themed';
import React from 'react';
import { ToastProps } from '../../utils/globalTypes';

export const Toast: React.FC<ToastProps> = ({
  uniqueToastId = Math.random().toString(),
  variant,
  action,
  spaceBetweenLines,
  title,
  text,
  titleStyle,
  textStyle,
  style,
}) => {
  return (
    <ToastGL nativeID={uniqueToastId} variant={variant} action={action} style={style}>
      <VStack space={spaceBetweenLines}>
        <ToastTitle style={titleStyle}>{title}</ToastTitle>
        <ToastDescription style={textStyle}>{text}</ToastDescription>
      </VStack>
    </ToastGL>
  );
};
