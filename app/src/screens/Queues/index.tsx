import { useNavigation } from '@react-navigation/native';
import ButtonFab from 'components/ButtonFab';
import QueueCard from 'components/QueueCard';
import Switch from 'components/Switch';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useTheme } from 'styled-components';

import { Container, Content, Header, HeaderText } from './styles';

const Queues: React.FC = () => {
  const [optionSelect, setOptionSelect] = useState('activated');
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <Container>
      <StatusBar backgroundColor={theme.colors.primary} style="light" />
      <Header>
        <HeaderText>Filas</HeaderText>
        <Switch
          onSelect={(number) => setOptionSelect(number)}
          optionSelected={optionSelect}
          style={{ marginBottom: 12 }}
        />
      </Header>
      <Content>
        <QueueCard title="Banco" />
      </Content>
      <ButtonFab onPress={() => navigation.navigate('QueueForm')} />
    </Container>
  );
};

export default Queues;
