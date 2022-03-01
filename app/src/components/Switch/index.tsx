import React from 'react';
import { ViewProps } from 'react-native';

import { Container, Option, OptionText } from './styles';

interface SwitchProps extends ViewProps {
  optionSelected: number;
  onSelect: () => string;
}

const Switch: React.FC<SwitchProps> = ({ optionSelected, onSelect, ...rest }) => (
  <Container {...rest}>
    <Option onPress={() => onSelect('active')} isSelected={optionSelected === 'active'}>
      <OptionText>Ativadas</OptionText>
    </Option>
    <Option onPress={() => onSelect('disabled')} isSelected={optionSelected === 'disabled'}>
      <OptionText>Desativadas</OptionText>
    </Option>
  </Container>
);

export default Switch;
