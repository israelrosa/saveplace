import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useTheme } from 'styled-components';

import { Container, Header, HeaderText } from './styles';

const Search: React.FC = () => {
  const theme = useTheme();
  return (
    <Container>
      <StatusBar backgroundColor={theme.colors.primary} style="light" />
      <Header>
        <HeaderText>Estabelecimentos</HeaderText>
      </Header>
    </Container>
  );
};

export default Search;
