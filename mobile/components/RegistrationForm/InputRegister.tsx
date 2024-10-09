import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { InputSize } from '../../utils/globalTypes';
import { HStack, Input, Text } from '../../atom';
import { EyeIconOpenClose } from '../EyeIconOpenClose';

interface InputRegisterProps {
  label: string;
  placeholder?: string;
  value?: string;
  setValue: (text: string) => void;
  size?: InputSize;
  type?: 'text' | 'password';
}

export const InputRegister: React.FC<InputRegisterProps> = ({
  label,
  placeholder,
  value,
  setValue,
  size = 'md',
  type = 'text',
}) => {
  const [textType, setTextType] = useState<'password' | 'text'>(type);

  const changeTextType = () => {
    setTextType((prevTextType) => (prevTextType === 'text' ? 'password' : 'text'));
  };

  return (
    <HStack style={styles.container}>
      <Text text={label} />
      <Input
        style={styles.input}
        size={size}
        textType={textType}
        value={value}
        onChangeText={(text) => {
          setValue(text);
        }}
        placeholder={placeholder}
      >
        {type === 'password' ? (
          <EyeIconOpenClose
            onPress={changeTextType}
            style={styles.iconStyle}
            textType={textType}
            iconSize={size}
          />
        ) : null}
      </Input>
    </HStack>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  iconStyle: {
    marginTop: 10,
    marginLeft: 4,
    paddingRight: 8,
  },
  input: {
    width: '58%',
    backgroundColor: colors.white,
    borderRadius: 10,
    margin: 1,
  },
});
