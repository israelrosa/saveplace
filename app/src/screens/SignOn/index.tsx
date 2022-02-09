import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import CustomButton from 'components/CustomButton';
import { TouchableOpacity } from 'react-native';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import SelectOption from 'components/SelectOption';
import { useNavigation } from '@react-navigation/native';
import { ActionsContainer, Container, InputsContainer, TextButton, HeaderText } from './styles';
import Input from '../../components/Input';

const SignOn: React.FC = () => {
  const formRef = useRef();
  const navigator = useNavigation();
  const [userType, setUserType] = useState('client');

  const handleSubmit = async (data) => {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
        phone: Yup.string().optional(),
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
      <HeaderText>Cadastrar</HeaderText>
      <Form style={{ flex: 1 }} ref={formRef} onSubmit={handleSubmit}>
        <InputsContainer>
          <SelectOption optionSelected={userType} onSelect={(type) => setUserType(type)} />
          <Input style={{ marginTop: 36 }} label="Nome" name="name" />
          <Input label="Email" name="email" />
          <Input label="Telefone" name="phone" />
          <Input label="Senha" name="password" isPassword />
        </InputsContainer>
        <ActionsContainer>
          <CustomButton text="Criar" onPress={() => formRef.current.submitForm()} />
          <TouchableOpacity
            style={{ width: '100%', alignItems: 'center', marginTop: 32 }}
            onPress={() => navigator.navigate('SignIn')}
          >
            <TextButton>Já tenho uma conta</TextButton>
          </TouchableOpacity>
        </ActionsContainer>
      </Form>
    </Container>
  );
};

export default SignOn;
