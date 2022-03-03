import { useNavigation } from '@react-navigation/native';
import ButtonFab from 'components/ButtonFab';
import QueueCard from 'components/QueueCard';
import Switch from 'components/Switch';
import { StatusBar } from 'expo-status-bar';
import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import React, { useEffect, useState } from 'react';
import { getUserQueues } from 'store/actions/queueActions';
import { useTheme } from 'styled-components';

import { Container, Content, Header, HeaderText } from './styles';

const Queues: React.FC = () => {
  const [optionSelect, setOptionSelect] = useState('active');
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { queue } = useAppSelector(state => state);

  useEffect(() => {
    dispatch(getUserQueues(optionSelect));
  }, [optionSelect]);

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
        {queue.userQueues && queue.userQueues.map(userQueue => (
          <QueueCard
            key={userQueue.id}
            style={{ marginBottom: 12 }}
            onPress={() => navigation.navigate('EstablishmentQueueDetails', { id: userQueue.id })}
            tagId={userQueue.tagId}
            title={userQueue.name}
            numberOfPeople={userQueue.numberOfPeople}
            waitingTimeMinutes={userQueue.waitingTimeMinutes}
          />
        ))}
      </Content>
      <ButtonFab onPress={() => navigation.navigate('QueueForm')} />
    </Container>
  );
};

export default Queues;
