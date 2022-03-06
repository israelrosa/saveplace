import { useNavigation } from '@react-navigation/native';
import ButtonFab from 'components/ButtonFab';
import QueueCard from 'components/QueueCard';
import Switch from 'components/Switch';
import { StatusBar } from 'expo-status-bar';
import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { getUserQueues } from 'store/actions/queueActions';
import { useTheme } from 'styled-components';

import { Container, Content, Header, HeaderText, LoadingContent } from './styles';

const Queues: React.FC = () => {
  const [optionSelect, setOptionSelect] = useState('active');
  const [pageLoad, setPageLoad] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { queue } = useAppSelector(state => state);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => setPageLoad(!pageLoad));
    dispatch(getUserQueues(optionSelect));

    return unsubscribe;
  }, [pageLoad, optionSelect]);

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
      {queue.isLoading && (
        <LoadingContent>
          <ActivityIndicator animating />
        </LoadingContent>
      )}
      {queue.userQueues && queue.userQueues.map(userQueue => (
        <Content>
          <QueueCard
            key={userQueue.id}
            style={{ marginBottom: 12 }}
            onPress={() => navigation.navigate('EstablishmentQueueDetails', { id: userQueue.id })}
            tagId={userQueue.tagId}
            title={userQueue.name}
            numberOfPeople={userQueue.numberOfPeople}
            waitingTimeMinutes={userQueue.waitingTimeMinutes}
          />
        </Content>
      ))}
      <ButtonFab onPress={() => navigation.navigate('QueueForm')} />
    </Container>
  );
};

export default Queues;
