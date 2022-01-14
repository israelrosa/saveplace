import React from 'react';
import { StatusBar } from 'expo-status-bar';
import CustomButton from 'components/CustomButton';
import { TouchableOpacity } from 'react-native';
import SignInImage from 'assets/SignInImage';
import { useTheme } from 'styled-components';
import {
  ActionsContainer,
  Container,
  InputsContainer,
  RegisterAction,
  TextButton,
  RegisterText,
  HeaderText,
  HeaderImage,
} from './styles';
import Input from '../../components/Input';

const SignIn: React.FC = () => {
  const theme = useTheme();

  return (
    <Container>
      <StatusBar style="auto" />
      <HeaderImage>
        <SignInImage />
      </HeaderImage>
      <HeaderText>Entrar</HeaderText>
      <InputsContainer>
        <Input label="Email" />
        <Input label="Senha" />
        <TextButton style={{ marginLeft: 'auto', marginTop: 12 }}>Esqueceu sua senha?</TextButton>
      </InputsContainer>
      <ActionsContainer>
        <CustomButton color={theme.colors.primary} text="Entrar" />
        <RegisterAction>
          <RegisterText>Não possui uma conta?</RegisterText>
          <TouchableOpacity>
            <TextButton>Cadastrar-se</TextButton>
          </TouchableOpacity>
        </RegisterAction>
      </ActionsContainer>
    </Container>
  );
};

export default SignIn;
