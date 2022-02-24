import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { useTheme } from 'styled-components';
import UilAngleLeft from '@iconscout/react-native-unicons/icons/uil-angle-left-b';
import { useNavigation } from '@react-navigation/native';
import Input from 'components/Input';
import { Form } from '@unform/mobile';
import { Switch } from 'react-native-paper';
import Option from 'components/Option';
import CustomButton from 'components/CustomButton';
import SelectInput from 'components/SelectInput';
import {
  ActionsContainer,
  Container,
  Content,
  Header,
  HeaderGoBack,
  HeaderText,
  Section,
} from './styles';

const QueueForm: React.FC = () => {
  const theme = useTheme();
  const formRef = useRef(null);
  const navigation = useNavigation();

  const handleSubmit = async (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Container>
      <StatusBar backgroundColor={theme.colors.primary} style="light" />
      <Header>
        <HeaderGoBack onPress={() => navigation.navigate('Queues')}>
          <UilAngleLeft color={theme.colors.text.reverse} size={24} />
          <HeaderText>Criar fila</HeaderText>
        </HeaderGoBack>
      </Header>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Section>Detalhes</Section>
          <Input label="Nome da fila" name="queueName" />
          <Section style={{ marginTop: 24 }}>Tag</Section>
          <SelectInput placeholder="Selecione a tag" />
          <Section style={{ marginTop: 24 }}>Status</Section>
          <Option hideArrowRight text="Aberto" iconRight={<Switch />} />
        </Form>
      </Content>
      <ActionsContainer>
        <CustomButton
          color={theme.colors.primary}
          text="Criar"
          onPress={() => formRef.current.submitForm()}
        />
      </ActionsContainer>
    </Container>
  );
};

export default QueueForm;
