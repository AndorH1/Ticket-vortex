import React, { useState } from 'react';
import { StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { InputSize } from '../../utils/globalTypes';
import { HStack, Input, Text, View } from '../../atom';
import { EyeIconOpenClose } from '../EyeIconOpenClose';

interface InputLoginProps {
  type?: 'password' | 'text';
  placeholder?: string;
  setText: (text: string) => void;
  size?: InputSize;
  style?: StyleProp<ViewStyle>;
  headerName: string;
}

export const InputLogin: React.FC<InputLoginProps> = ({
  type = 'text',
  setText,
  size = 'md',
  placeholder,
  style,
  headerName,
}) => {
  const [textType, setTextType] = useState<'password' | 'text'>(type);

  const changeTextType = () => {
    setTextType((prevTextType) => (prevTextType === 'text' ? 'password' : 'text'));
  };

  return (
    <View style={style}>
      <Text text={headerName} style={loginStyle.inputLoginTextSize} />
      {type === 'password' ? (
        <HStack>
          <Input
            size={size}
            style={loginStyle.input}
            textType={textType}
            placeholder={placeholder}
            onChangeText={(text) => setText(text)}
          >
            <EyeIconOpenClose
              onPress={changeTextType}
              style={loginStyle.icon}
              textType={textType}
              iconSize={size}
            />
          </Input>
        </HStack>
      ) : (
        <Input
          size={size}
          style={loginStyle.input}
          textType={textType}
          placeholder={placeholder}
          onChangeText={(text) => setText(text)}
        />
      )}
    </View>
  );
};

const loginStyle = StyleSheet.create({
  inputLoginTextSize: {
    paddingRight: 2,
    margin: 4,
  },
  input: {
    width: '100%',
    borderRadius: 10,
  },
  icon: {
    marginTop: 10,
    marginLeft: 4,
    paddingRight: 8,
  },
});
