import ChipTag from 'components/ChipTag';
import QueueCard from 'components/QueueCard';
import SearchInput from 'components/SearchInput';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useTheme } from 'styled-components';

import { Container, Content, FiltersContainer, Header, HeaderText } from './styles';

const Search: React.FC = () => {
  const theme = useTheme();
  return (
    <Container>
      <StatusBar backgroundColor={theme.colors.primary} style="light" />
      <Header>
        <HeaderText>Estabelecimentos</HeaderText>
        <SearchInput placeholder="Buscar" />
      </Header>
      <FiltersContainer horizontal>
        <ChipTag text="Todos" selected />
        <ChipTag text="Médicos" />
        <ChipTag text="Todos" />
      </FiltersContainer>
      <Content>
        <QueueCard
          title="Banco"
          numberOfPeople={12}
          waitingTimeMinutes={12}
          image="data:image/png;base64,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"
        />
      </Content>
    </Container>
  );
};

export default Search;
