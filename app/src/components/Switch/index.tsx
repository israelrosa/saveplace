import React from 'react';
import { ViewProps } from 'react-native';

import { Container, Option, OptionText } from './styles';

interface SwitchProps extends ViewProps {
  optionSelected: number;
  onSelect: () => string;
}

const Switch: React.FC<SwitchProps> = ({ optionSelected, onSelect, ...rest }) => (
  <Container {...rest}>
    <Option onPress={() => onSelect('activated')} isSelected={optionSelected === 'activated'}>
      <OptionText>Ativadas</OptionText>
    </Option>
    <Option onPress={() => onSelect('desactivated')} isSelected={optionSelected === 'desactivated'}>
      <OptionText>Desativadas</OptionText>
    </Option>
  </Container>
);

export default Switch;
