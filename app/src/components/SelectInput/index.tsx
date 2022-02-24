import React from 'react';
import UilAngle from '@iconscout/react-native-unicons/icons/uil-angle-down';
import { useTheme } from 'styled-components';
import { Container, Icon, TextInput } from './styles';

interface SelectInputInterface {
  placeholder: string;
}

const SelectInput: React.FC<SelectInputInterface> = ({ placeholder }) => {
  const theme = useTheme();
  return (
    <Container>
      <TextInput placeholder={placeholder} editable={false} />
      <Icon>
        <UilAngle size={24} color={theme.colors.text.neutral} />
      </Icon>
    </Container>
  );
};

export default SelectInput;
