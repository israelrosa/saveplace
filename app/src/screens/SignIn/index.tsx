import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import CustomButton from 'components/CustomButton';
import { Keyboard, TouchableOpacity } from 'react-native';
import SignInImage from 'assets/SignInImage';
import { useTheme } from 'styled-components';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import { login } from 'store/actions/authenticationActions';
import { useNavigation } from '@react-navigation/native';
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
  const navigator = useNavigation();
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardIsOpen, setKeyboardIsOpen] = React.useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsOpen(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsOpen(false);
    });
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, [Keyboard]);

  useEffect(() => {
    setIsLoading(auth?.isLoading);
  }, [auth, isLoading]);

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
      const { email, password } = data;
      dispatch(login(email, password));
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
      {!keyboardIsOpen && (
        <HeaderImage>
          <SignInImage />
        </HeaderImage>
      )}
      <HeaderText>Entrar</HeaderText>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputsContainer>
          <Input label="Email" name="email" keyboardType="email-address" />
          <Input label="Senha" name="password" isPassword />
          <TextButton style={{ marginLeft: 'auto', marginTop: 12 }}>Esqueceu sua senha?</TextButton>
        </InputsContainer>
        <ActionsContainer>
          <CustomButton
            isLoading={isLoading}
            color={theme.colors.primary}
            text="Entrar"
            onPress={() => formRef.current.submitForm()}
          />
          <RegisterAction>
            <RegisterText>Não possui uma conta?</RegisterText>
            <TouchableOpacity onPress={() => navigator.navigate('SignOn')}>
              <TextButton>Cadastrar-se</TextButton>
            </TouchableOpacity>
          </RegisterAction>
        </ActionsContainer>
      </Form>
    </Container>
  );
};

export default SignIn;
