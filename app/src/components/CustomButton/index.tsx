import React from 'react';
import { Button } from 'react-native-paper';

interface CustomButtonProps {
  color: string;
  text: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, color }) => (
  <Button
    theme={{ roundness: 20 }}
    mode="contained"
    color={color}
    uppercase={false}
    contentStyle={{ height: 52 }}
  >
    {text}
  </Button>
);

export default CustomButton;
