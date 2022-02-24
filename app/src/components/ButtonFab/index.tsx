import React from 'react';
import { ButtonProps } from 'react-native';
import { FAB } from 'react-native-paper';
import { useTheme } from 'styled-components';

const ButtonFab: React.FC<Partial<ButtonProps>> = ({ onPress }) => {
  const theme = useTheme();
  return (
    <FAB
      icon="plus"
      onPress={onPress}
      style={{ position: 'absolute', bottom: 24, right: 24 }}
      color={theme.colors.text.reverse}
      theme={{
        colors: {
          accent: theme.colors.primary,
        },
      }}
    />
  );
};

export default ButtonFab;
