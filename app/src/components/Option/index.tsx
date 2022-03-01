import React from 'react';
import UilAngleRight from '@iconscout/react-native-unicons/icons/uil-angle-right';

import { useTheme } from 'styled-components';
import { Container, Icon, Text } from './styles';

interface OptionProps {
  iconLeft: React.ReactNode;
  iconRight: React.ReactNode;
  text: string;
  hideArrowRight: boolean;
  onPress: () => void;
}

const Option: React.FC<OptionProps> = ({ text, iconLeft, iconRight, hideArrowRight, onPress }) => {
  const theme = useTheme();
  return (
    <Container onPress={onPress}>
      {iconLeft && <Icon>{iconLeft}</Icon>}
      <Text>{text}</Text>
      {!hideArrowRight && <UilAngleRight color={theme.colors.text.neutral} size={24} />}
      {iconRight}
    </Container>
  );
};

export default Option;
