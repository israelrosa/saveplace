import { useRoute } from '@react-navigation/native';
import CustomButton from 'components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { getCurrentQueue, getQueue } from 'store/actions/queueActions';
import { useTheme } from 'styled-components';

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
  Header,
  HeaderImage,
  HeaderText,
  SubHeader,
  SubHeaderText,
} from './styles';

const QueueDetails: React.FC = () => {
  const theme = useTheme();
  const router = useRoute();
  const dispatch = useAppDispatch();
  const { queue, user } = useAppSelector(state => state);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let dispatchInterval: NodeJS.Timer;
    if (router.params?.id) {
      dispatch(getQueue(router.params.id));
      if (user.data.type === 'client') {
        dispatch(getQueue(router.params.id));
        dispatchInterval = setInterval(() => {
          dispatch(getQueue(router.params.id));
        }, 60 * 1000);
      }
    } else {
      dispatch(getCurrentQueue());
    }

    return () => {
      clearInterval(dispatchInterval);
    };
  }, [router.params]);

  return (
    <Container>
      <StatusBar backgroundColor={theme.colors.primary} style="light" />
      <Header>
        <HeaderImage
          source={{
            uri: 'http://www.stevnserhvervsraad.dk/wp-content/uploads/blank-avatar.png',
          }}
        />
        <HeaderText>{queue.queueDetail?.user?.name || ''}</HeaderText>
      </Header>
      <SubHeader>
        <SubHeaderText>{queue.queueDetail?.name || ''}</SubHeaderText>
      </SubHeader>
      <CardsContainer>
        <View style={{ flexDirection: 'row' }}>
          <Card>
            <CardBox style={{ backgroundColor: theme.colors.background.grey }}>
              <CardSpan>{user.data.type === 'client' ? 'Atual' : 'Anterior'}</CardSpan>
              <CardSection>
                Senha:
                {queue.queueDetail?.previousCode || 0 }
              </CardSection>
            </CardBox>
            <CardBox style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CardAvatar
                source={{
                  uri: 'http://www.stevnserhvervsraad.dk/wp-content/uploads/blank-avatar.png',
                }}
              />
              <CardSection style={{ marginLeft: 12 }}>{queue.queueDetail?.data?.previousClient?.user.name || ''}</CardSection>
            </CardBox>
          </Card>
          <View style={{ width: 12 }} />
          <Card>
            <CardBox style={{ backgroundColor: theme.colors.background.grey }}>
              <CardSpan>Próximo(a) da fila</CardSpan>
              <CardSection>
                Senha:
                {' '}
                {queue.queueDetail?.data?.nextClient?.code || 0}
              </CardSection>
            </CardBox>
            <CardBox style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CardAvatar
                source={{
                  uri: 'http://www.stevnserhvervsraad.dk/wp-content/uploads/blank-avatar.png',
                }}
              />
              <CardSection style={{ marginLeft: 12 }}>{queue.queueDetail?.data?.nextClient?.user.name || ''}</CardSection>
            </CardBox>
          </Card>
        </View>
        <Card>
          <CardBox style={{ backgroundColor: theme.colors.background.grey }}>
            <CardSection>{user.data.type === 'client' ? 'Sua senha' : 'Senha atual'}</CardSection>
          </CardBox>
          <CardBox>
            <CardHero>{user.data.type === 'client' ? queue.currentQueue?.code || 0 : queue.queueDetails?.currentCode || 0}</CardHero>
          </CardBox>
        </Card>
        <View style={{ flexDirection: 'row' }}>
          <Card>
            <CardBox>
              <CardHero>{queue.queueDetails?.numberOfPeople || 0}</CardHero>
            </CardBox>
            <CardBox style={{ backgroundColor: theme.colors.background.grey }}>
              <CardSection>{user.data.type === 'client' ? 'Posição' : 'Pessoas'}</CardSection>
              <CardSpan>Na fila</CardSpan>
            </CardBox>
          </Card>
          <View style={{ width: 12 }} />
          <Card>
            <CardBox>
              <CardHero>{queue.queueDetails?.waitingTimeMinutes || 0}</CardHero>
            </CardBox>
            <CardBox style={{ backgroundColor: theme.colors.background.grey }}>
              <CardSection>Minutos</CardSection>
              <CardSpan>De espera</CardSpan>
            </CardBox>
          </Card>
        </View>
        <ActionsContainer>
          {user.data.type === 'client' ? (
            <CustomButton color={theme.colors.primary} text="Entrar na fila" />
          ) : (
            <CustomButton color={theme.colors.primary} text="Chamar próximo" />
          )}
        </ActionsContainer>
      </CardsContainer>
    </Container>
  );
};

export default QueueDetails;
