import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

interface CustomButtonProps extends RectButtonProps {
  color: string;
  text: string;
  isLoading: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  color,
  onPress,
  isLoading,
  ...rest
}) => (
  <Button
    theme={{ roundness: 20 }}
    mode="contained"
    color={color}
    loading={isLoading}
    uppercase={false}
    contentStyle={{ height: 52 }}
    onPress={onPress}
    {...rest}
  >
    {text}
  </Button>
);

export default CustomButton;
