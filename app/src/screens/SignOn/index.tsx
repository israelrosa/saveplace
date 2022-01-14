import React from 'react';
import { StatusBar } from 'expo-status-bar';
import CustomButton from 'components/CustomButton';
import { TouchableOpacity } from 'react-native';
import { ActionsContainer, Container, InputsContainer, TextButton, HeaderText } from './styles';
import Input from '../../components/Input';

const SignOn: React.FC = () => (
  <Container>
    <StatusBar style="auto" />
    <HeaderText>Cadastrar</HeaderText>
    <InputsContainer>
      <Input label="Nome" />
      <Input label="Email" />
      <Input label="Telefone" />
      <Input label="Senha" />
    </InputsContainer>
    <ActionsContainer>
      <CustomButton text="Criar" />
      <TouchableOpacity style={{ width: '100%', alignItems: 'center', marginTop: 32 }}>
        <TextButton>Já tenho uma conta</TextButton>
      </TouchableOpacity>
    </ActionsContainer>
  </Container>
);

export default SignOn;
