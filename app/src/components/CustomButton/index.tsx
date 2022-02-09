import React from 'react';
import { ButtonProps } from 'react-native';
import { Button } from 'react-native-paper';

interface CustomButtonProps extends ButtonProps {
  color: string;
  text: string;
  isLoading: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, color, onPress, isLoading }) => (
  <Button
    theme={{ roundness: 20 }}
    mode="contained"
    color={color}
    loading={isLoading}
    uppercase={false}
    contentStyle={{ height: 52 }}
    onPress={onPress}
  >
    {text}
  </Button>
);

export default CustomButton;
