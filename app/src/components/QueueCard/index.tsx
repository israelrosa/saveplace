import React from 'react';
import UilAngleRight from '@iconscout/react-native-unicons/icons/uil-angle-right-b';
import UilUsersAlt from '@iconscout/react-native-unicons/icons/uil-users-alt';
import UilClock from '@iconscout/react-native-unicons/icons/uil-clock';

import { useTheme } from 'styled-components';
import {
  Container,
  Content,
  ContentImage,
  ContentInfo,
  Footer,
  FooterInfo,
  FooterText,
  FooterTextNumber,
  Title,
} from './styles';

interface QueueCardProps {
  title: string;
  image: string;
  numberOfPeople: number;
  waitingTimeMinutes: number;
}

const QueueCard: React.FC<QueueCardProps> = ({
  title,
  image,
  numberOfPeople,
  waitingTimeMinutes,
}) => {
  const theme = useTheme();
  return (
    <Container>
      <Content>
        {image && <ContentImage source={{ uri: image }} />}
        <ContentInfo>
          <Title>{title}</Title>
          <UilAngleRight size={24} color={theme.colors.text.neutral} />
        </ContentInfo>
      </Content>
      <Footer>
        <UilUsersAlt color={theme.colors.text.neutral} size={32} />
        <FooterInfo style={{ marginRight: 12 }}>
          <FooterTextNumber>{numberOfPeople}</FooterTextNumber>
          <FooterText>Pessoas</FooterText>
          <FooterText style={{ marginTop: -6 }}>na fila</FooterText>
        </FooterInfo>
        <UilClock color={theme.colors.text.neutral} size={32} />
        <FooterInfo>
          <FooterTextNumber>{waitingTimeMinutes}</FooterTextNumber>
          <FooterText>Minutos</FooterText>
          <FooterText style={{ marginTop: -6 }}>por pessoa</FooterText>
        </FooterInfo>
      </Footer>
    </Container>
  );
};

export default QueueCard;
