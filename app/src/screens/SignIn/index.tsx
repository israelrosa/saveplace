import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import CustomButton from 'components/CustomButton';
import { Keyboard, TouchableOpacity, View, StatusBar as SB } from 'react-native';
import SignInImage from 'assets/SignInImage';
import { useTheme } from 'styled-components';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import { clearAuthErrors, login } from 'store/actions/authenticationActions';
import { useNavigation } from '@react-navigation/native';
import { Button, Dialog, Paragraph, Portal, ProgressBar } from 'react-native-paper';
import { errors } from 'utils';
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
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state);
  const [pageLoad, setPageLoad] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [error, setError] = useState({});
  const [keyboardIsOpen, setKeyboardIsOpen] = React.useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsOpen(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsOpen(false);
    });

    const unsubscribe = navigation.addListener('focus', () => setPageLoad(!pageLoad));

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
      unsubscribe();
    };
  }, [pageLoad]);

  useEffect(() => {
    if (auth.error) {
      const selectedError = errors[auth.error];
      if (selectedError) {
        setError(errors[auth.error]);
      } else {
        setError(errors.unknown_error);
      }
      setErrorDialog(true);
    }
  }, [auth]);

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
        err.inner.forEach((errData) => {
          Reflect.set(validationErrors, errData.path, errData.message);
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  };

  const handleCloseErrorDialog = () => {
    dispatch(clearAuthErrors());
    setErrorDialog(false);
  };

  return (
    <Container>
      <View style={{ position: 'absolute', width: '100%', top: SB.currentHeight }}>
        <ProgressBar indeterminate visible={auth.isLoading} />
      </View>
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
            isLoading={auth.isLoading}
            color={theme.colors.primary}
            text="Entrar"
            onPress={() => formRef.current.submitForm()}
          />
          <RegisterAction>
            <RegisterText>Não possui uma conta?</RegisterText>
            <TouchableOpacity onPress={() => navigation.navigate('SignOn')}>
              <TextButton>Cadastrar-se</TextButton>
            </TouchableOpacity>
          </RegisterAction>
        </ActionsContainer>
      </Form>
      <Portal>
        <Dialog visible={errorDialog}>
          <Dialog.Title>{error.title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{error.message}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleCloseErrorDialog}>Fechar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Container>
  );
};

export default SignIn;
