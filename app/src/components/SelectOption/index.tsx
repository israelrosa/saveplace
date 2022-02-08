import React from 'react';
import { ViewProps } from 'react-native';

import { Container, Option, OptionText } from './styles';

interface SelectOptionProps extends ViewProps {
  optionSelected: number;
  onSelect: () => string;
}

const SelectOption: React.FC<SelectOptionProps> = ({ optionSelected, onSelect, ...rest }) => (
  <Container {...rest}>
    <Option onPress={() => onSelect('client')} isSelected={optionSelected === 'client'}>
      <OptionText isSelected={optionSelected === 'client'}>Cliente</OptionText>
    </Option>
    <Option
      onPress={() => onSelect('establishment')}
      isSelected={optionSelected === 'establishment'}
    >
      <OptionText isSelected={optionSelected === 'establishment'}>Estabelecimento</OptionText>
    </Option>
  </Container>
);

export default SelectOption;
