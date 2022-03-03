import React, { useEffect, useState } from 'react';
import UilAngleRight from '@iconscout/react-native-unicons/icons/uil-angle-right-b';
import UilUsersAlt from '@iconscout/react-native-unicons/icons/uil-users-alt';
import UilClock from '@iconscout/react-native-unicons/icons/uil-clock';

import { useTheme } from 'styled-components';
import { ViewProps } from 'react-native';
import ChipTag from 'components/ChipTag';
import api from 'services/api';
import {
  Container,
  Content,
  ContentImage,
  ContentInfo,
  ContentSide,
  ContentTag,
  Footer,
  FooterInfo,
  FooterText,
  FooterTextNumber,
  Title,
} from './styles';

interface QueueCardProps extends ViewProps {
  title: string;
  image: string;
  numberOfPeople: number;
  waitingTimeMinutes: number;
  tagId: string;
  onPress: () => void;
}

const QueueCard: React.FC<QueueCardProps> = ({
  title,
  image,
  numberOfPeople,
  waitingTimeMinutes,
  tagId,
  onPress,
  ...rest
}) => {
  const theme = useTheme();
  const [tag, setTag] = useState('');

  useEffect(() => {
    api.get(`/tags/${tagId}`).then(({ data }) => {
      setTag(data.name);
    }).catch(err => {
      console.log(err);
    });
  }, [tag]);

  return (
    <Container onPress={onPress} {...rest}>
      <Content>
        {image && <ContentImage source={{ uri: image }} />}
        <ContentSide>

          <ContentInfo>
            <Title>{title}</Title>
            <UilAngleRight size={24} color={theme.colors.text.neutral} />
          </ContentInfo>
          <ContentTag>
            <ChipTag text={tag} />
          </ContentTag>
        </ContentSide>
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
