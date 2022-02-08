import React from 'react';
import { ButtonProps } from 'react-native';
import { Button } from 'react-native-paper';

interface CustomButtonProps extends ButtonProps {
  color: string;
  text: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, color, onPress }) => (
  <Button
    theme={{ roundness: 20 }}
    mode="contained"
    color={color}
    uppercase={false}
    contentStyle={{ height: 52 }}
    onPress={onPress}
  >
    {text}
  </Button>
);

export default CustomButton;
