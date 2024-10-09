import React from 'react';
import { Input as InputGL, InputField } from '@gluestack-ui/themed';
import { InputProps } from '../../utils/globalTypes';

export const Input: React.FC<InputProps> = ({
  size,
  placeholder,
  onChangeText: onChangeText,
  textType,
  style,
  children,
  value,
}) => {
  return (
    <InputGL size={size} style={style}>
      <InputField
        value={value}
        type={textType}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(text)}
      />
      {children}
    </InputGL>
  );
};
