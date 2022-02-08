import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import CustomButton from 'components/CustomButton';
import { TouchableOpacity } from 'react-native';
import SignInImage from 'assets/SignInImage';
import { useTheme } from 'styled-components';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
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
  const formRef = useRef(null);

  const handleSubmit = async (data) => {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
        password: Yup.string()
          .min(6, 'A senha deve ter no mínimo 6 caracteres')
          .required('A senha é obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          Reflect.set(validationErrors, error.path, error.message);
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  };

  return (
    <Container>
      <StatusBar style="auto" />
      <HeaderImage>
        <SignInImage />
      </HeaderImage>
      <HeaderText>Entrar</HeaderText>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputsContainer>
          <Input label="Email" name="email" keyboardType="email-address" />
          <Input label="Senha" name="password" isPassword />
          <TextButton style={{ marginLeft: 'auto', marginTop: 12 }}>Esqueceu sua senha?</TextButton>
        </InputsContainer>
        <ActionsContainer>
          <CustomButton
            color={theme.colors.primary}
            text="Entrar"
            onPress={() => formRef.current.submitForm()}
          />
          <RegisterAction>
            <RegisterText>Não possui uma conta?</RegisterText>
            <TouchableOpacity>
              <TextButton>Cadastrar-se</TextButton>
            </TouchableOpacity>
          </RegisterAction>
        </ActionsContainer>
      </Form>
    </Container>
  );
};

export default SignIn;
