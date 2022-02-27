import React from 'react';
import UilAngle from '@iconscout/react-native-unicons/icons/uil-angle-down';
import { useTheme } from 'styled-components';
import { Container, Icon, TextInput } from './styles';

interface SelectInputInterface {
  placeholder: string;
  onPress: () => void;
}

const SelectInput: React.FC<SelectInputInterface> = ({ placeholder, onPress }) => {
  const theme = useTheme();
  return (
    <Container onPress={onPress}>
      <TextInput placeholder={placeholder} editable={false} />
      <Icon>
        <UilAngle size={24} color={theme.colors.text.neutral} />
      </Icon>
    </Container>
  );
};

export default SelectInput;
