import React from 'react';
import { TextInput } from 'react-native-paper';
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import { useTheme } from 'styled-components';

type InputProps = Partial<TextInputProps>;

const Input: React.FC<InputProps> = ({ ...rest }) => {
  const theme = useTheme();

  return (
    <TextInput
      mode="outlined"
      theme={{
        colors: {
          placeholder: theme.colors.text.neutral,
          primary: theme.colors.primary,
          text: theme.colors.text.primary,
        },
      }}
      autoComplete={undefined}
      {...rest}
    />
  );
};

export default Input;
