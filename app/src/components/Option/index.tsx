import React from 'react';
import UilAngleRight from '@iconscout/react-native-unicons/icons/uil-angle-right';

import { useTheme } from 'styled-components';
import { Container, Text } from './styles';

interface OptionProps {
  icon: React.ReactNode;
  text: string;
  hideArrowRight: boolean;
}

const Option: React.FC<OptionProps> = ({ text, icon, hideArrowRight }) => {
  const theme = useTheme();
  return (
    <Container>
      {icon}
      <Text>{text}</Text>
      {!hideArrowRight && <UilAngleRight color={theme.colors.text.neutral} size={24} />}
    </Container>
  );
};

export default Option;
