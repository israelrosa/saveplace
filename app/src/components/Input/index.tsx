import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import { useTheme } from 'styled-components';
import { useField } from '@unform/core';
import { Text } from 'react-native';
import UilEye from '@iconscout/react-native-unicons/icons/uil-eye';
import UilEyeSlash from '@iconscout/react-native-unicons/icons/uil-eye-slash';

interface InputProps extends Partial<TextInputProps> {
  name: string;
  isPassword: boolean;
  onChangeText: () => string;
}

const PasswordIcon: React.FC = ({ isSecure, color }) => (
  <>
    {isSecure && <UilEye size={30} color={color} />}
    {!isSecure && <UilEyeSlash size={30} color={color} />}
  </>
);

const Input: React.FC<InputProps> = ({ name, onChangeText, isPassword, ...rest }) => {
  const theme = useTheme();
  const inputRef = useRef(null);
  const [secure, setSecure] = useState(isPassword);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue() {
        if (inputRef.current) return inputRef.current.value;
        return '';
      },
      setValue(ref, value) {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: value });
          inputRef.current.value = value;
        }
      },
      clearValue() {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: '' });
          inputRef.current.value = '';
        }
      },
    });
  }, [fieldName, registerField]);

  const handleChangeText = useCallback(
    (text) => {
      if (inputRef.current) inputRef.current.value = text;
      if (onChangeText) onChangeText(text);
    },
    [onChangeText]
  );

  return (
    <>
      <TextInput
        mode="outlined"
        ref={inputRef}
        theme={{
          colors: {
            placeholder: theme.colors.text.neutral,
            primary: theme.colors.primary,
            text: theme.colors.text.primary,
            disabled: theme.colors.disabled,
          },
        }}
        error={error}
        secureTextEntry={secure}
        defaultValue={defaultValue}
        onChangeText={handleChangeText}
        autoComplete={undefined}
        {...rest}
        right={
          isPassword && (
            <TextInput.Icon
              name={() => (
                <PasswordIcon
                  isSecure={secure}
                  color={error ? theme.colors.text.error : theme.colors.text.neutral}
                />
              )}
              onPress={() => setSecure(!secure)}
            />
          )
        }
      />
      {error && (
        <Text
          style={{
            color: theme.colors.text.error,
            fontFamily: theme.fonts.caption.main.fontFamily,
          }}
        >
          {error}
        </Text>
      )}
    </>
  );
};

export default Input;
