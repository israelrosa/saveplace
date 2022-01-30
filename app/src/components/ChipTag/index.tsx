import React from 'react';
import { Container, ContentText } from './styles';

interface ChipProps {
  text: string;
  selected: boolean;
}

const ChipTag: React.FC<ChipProps> = ({ selected, text }) => (
  <Container selected={selected}>
    <ContentText>{text}</ContentText>
  </Container>
);

export default ChipTag;
