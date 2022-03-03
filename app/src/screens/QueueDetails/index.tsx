import { useNavigation, useRoute } from '@react-navigation/native';
import CustomButton from 'components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { callNextClient, getCurrentQueue, getQueue, joinQueue, quitQueue } from 'store/actions/queueActions';
import { useTheme } from 'styled-components';
import UilAngleLeft from '@iconscout/react-native-unicons/icons/uil-angle-left-b';
import UilSetting from '@iconscout/react-native-unicons/icons/uil-setting';

import {
  ActionsContainer,
  Card,
  CardAvatar,
  CardBox,
  CardHero,
  CardsContainer,
  CardSection,
  CardSpan,
  Container,
  ContentContainer,
  Header,
  HeaderAction,
  HeaderImage,
  HeaderText,
  HeaderTitleContent,
  SubHeader,
  SubHeaderText,
} from './styles';

const QueueDetails: React.FC = () => {
  const theme = useTheme();
  const router = useRoute();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { queue, user } = useAppSelector(state => state);
  const [queueName, setQueueName] = useState('');
  const [queueOwner, setQueueOwner] = useState('');
  // const [currentClient, setCurrentClient] = useState({});
  const [nextClient, setNextClient] = useState({});
  const [previousClient, setPreviousClient] = useState({});
  const [waitingTimeMinutes, setWaitingTimeMinutes] = useState(0);
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [currentCode, setCurrentCode] = useState(0);
  const [queuePosition, setQueuePosition] = useState(0);
  const [queueId, setQueueId] = useState('');
  const [queueClientId, setQueueClientId] = useState('');

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const dispatchIntervals = [];
    if (router?.params?.id) {
      dispatch(getQueue(router.params.id));
      if (user.data.type === 'client') {
        dispatchIntervals.push(setInterval(() => {
          dispatch(getQueue(router.params.id));
        }, 60 * 1000));
      }
    } else if (user.data.type === 'client') {
      dispatch(getCurrentQueue());
      dispatchIntervals.push(setInterval(() => {
        dispatch(getCurrentQueue());
      }, 60 * 1000));
    }

    return () => {
      dispatchIntervals.forEach(dispatchInterval => {
        clearInterval(dispatchInterval);
      });
    };
  }, [router.params]);

  useEffect(() => {
    if (queue.queueDetail) {
      console.log(queue.queueDetail);
      setWaitingTimeMinutes(queue.queueDetail.waitingTimeMinutes);
      setNextClient(queue.queueDetail.nextClient);
      setPreviousClient(queue.queueDetail.previousClient);
      setQueueId(queue.queueDetail.id);
      setQueueName(queue.queueDetail.name);
      setQueueOwner(queue.queueDetail?.user?.name);
      if (router?.params?.id) {
        setCurrentCode(queue.queueDetail.currentCode);
        setNumberOfPeople(queue.queueDetail.numberOfPeople);
        setQueuePosition(queue.queueDetail.numberOfPeople);
      }
    }
  }, [queue, queue.queueDetail, queue.currentQueue]);

  useEffect(() => {
    if (!router?.params?.id && queue.currentQueue) {
      console.log(queue.currentQueue);
      setQueuePosition(queue.currentQueue.position);
      setCurrentCode(queue.currentQueue.code);
      setQueueId(queue.currentQueue.queueId);
      setQueueClientId(queue.currentQueue.id);
      dispatch(getQueue(queue.currentQueue.queueId));
    }
  }, [router.params, queue.currentQueue]);

  const handleJoinQueue = () => {
    dispatch(joinQueue(queueId)).then(() => {
      dispatch(getCurrentQueue());
      navigation.navigate('QueueDetails');
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleQuitQueue = () => {
    dispatch(quitQueue(queueClientId)).then(() => {
      navigation.navigate('SearchQueueDetails', { id: queueId });
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <Container>
      <StatusBar backgroundColor={theme.colors.primary} style="light" />
      <Header>
        <HeaderAction onPress={() => navigation.goBack()}>
          <UilAngleLeft color={theme.colors.text.reverse} size={24} />
        </HeaderAction>
        <HeaderTitleContent>
          <HeaderImage
            source={{
              uri: 'http://www.stevnserhvervsraad.dk/wp-content/uploads/blank-avatar.png',
            }}
          />
          <HeaderText>{queueOwner}</HeaderText>
        </HeaderTitleContent>
        <HeaderAction onPress={() => navigation.navigate('QueueForm', { isEditMode: true })}>
          <UilSetting color={theme.colors.text.reverse} size={24} />
        </HeaderAction>
      </Header>
      <SubHeader>
        <SubHeaderText>{queueName}</SubHeaderText>
      </SubHeader>
      <ContentContainer>
        <CardsContainer>
          <View style={{ flexDirection: 'row', marginTop: 24 }}>
            {!(router?.params?.id && user.data.type === 'client') && (
            <>
              <Card>
                <CardBox style={{ backgroundColor: theme.colors.background.grey }}>
                  <CardSpan>{user.data.type === 'client' ? 'Atual' : 'Anterior'}</CardSpan>
                  <CardSection>
                    Senha:
                    {previousClient?.code || 0 }
                  </CardSection>
                </CardBox>
                <CardBox style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CardAvatar
                    source={{
                      uri: 'http://www.stevnserhvervsraad.dk/wp-content/uploads/blank-avatar.png',
                    }}
                  />
                  <CardSection style={{ marginLeft: 12 }}>{previousClient?.user?.name}</CardSection>
                </CardBox>
              </Card>
              <View style={{ width: 12 }} />
              <Card>
                <CardBox style={{ backgroundColor: theme.colors.background.grey }}>
                  <CardSpan>Próximo(a) da fila</CardSpan>
                  <CardSection>
                    Senha:
                    {' '}
                    {nextClient?.code || 0}
                  </CardSection>
                </CardBox>
                <CardBox style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CardAvatar
                    source={{
                      uri: 'http://www.stevnserhvervsraad.dk/wp-content/uploads/blank-avatar.png',
                    }}
                  />
                  <CardSection style={{ marginLeft: 12 }}>{nextClient?.user?.name || ''}</CardSection>
                </CardBox>
              </Card>
            </>
            )}
          </View>
          <Card>
            <CardBox style={{ backgroundColor: theme.colors.background.grey }}>
              <CardSection>{!router?.params?.id && user.data.type === 'client' ? 'Sua senha' : 'Senha atual'}</CardSection>
            </CardBox>
            <CardBox>
              <CardHero>{currentCode}</CardHero>
            </CardBox>
          </Card>
          <View style={{ flexDirection: 'row' }}>
            <Card>
              <CardBox>
                <CardHero>{user.data.type === 'client' ? queuePosition : numberOfPeople}</CardHero>
              </CardBox>
              <CardBox style={{ backgroundColor: theme.colors.background.grey }}>
                <CardSection>{!router?.params?.id && user.data.type ? 'Posição' : 'Pessoas'}</CardSection>
                <CardSpan>Na fila</CardSpan>
              </CardBox>
            </Card>
            <View style={{ width: 12 }} />
            <Card>
              <CardBox>
                <CardHero>{waitingTimeMinutes || 0}</CardHero>
              </CardBox>
              <CardBox style={{ backgroundColor: theme.colors.background.grey }}>
                <CardSection>Minutos</CardSection>
                <CardSpan>De espera</CardSpan>
              </CardBox>
            </Card>
          </View>
        </CardsContainer>
        <ActionsContainer>
          {router?.params?.id && user.data.type === 'client' && (
            <CustomButton color={theme.colors.primary} text="Entrar na fila" onPress={handleJoinQueue} />
          )}
          { router?.params?.id && user.data.type === 'establishment' && (
            <CustomButton color={theme.colors.primary} text="Chamar próximo" onPress={() => dispatch(callNextClient(router.params.id))} />
          )}
          {!router?.params?.id && (
            <CustomButton color={theme.colors.primary} text="Sair da fila" onPress={handleQuitQueue} />
          )}
        </ActionsContainer>
      </ContentContainer>
    </Container>
  );
};

export default QueueDetails;
