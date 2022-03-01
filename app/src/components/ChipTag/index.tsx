import React from 'react';
import { ViewProps } from 'react-native';
import { Container, ContentText } from './styles';

interface ChipProps extends ViewProps {
  text: string;
  selected: boolean;
  onSelect: () => void;
}

const ChipTag: React.FC<ChipProps> = ({ onSelect, selected, text, ...rest }) => (
  <Container onPress={onSelect} selected={selected} {...rest}>
    <ContentText>{text}</ContentText>
  </Container>
);

export default ChipTag;
