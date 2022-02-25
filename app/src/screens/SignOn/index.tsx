import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import CustomButton from 'components/CustomButton';
import { TouchableOpacity } from 'react-native';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import SelectOption from 'components/SelectOption';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from 'hooks/storeHook';
import { register } from 'store/actions/authenticationActions';
import { useTheme } from 'styled-components';
import { ActionsContainer, Container, InputsContainer, TextButton, HeaderText } from './styles';
import Input from '../../components/Input';

const SignOn: React.FC = () => {
  const formRef = useRef();
  const navigator = useNavigation();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [userType, setUserType] = useState('client');
  const [showNextSection, setShowNextSection] = useState(false);

  const handleSubmit = async (data) => {
    if (showNextSection) {
      try {
        // Remove all previous errors
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          cep: Yup.string().required('O CEP é obrigatório'),
          state: Yup.string().required('O estado é obrigatório'),
          city: Yup.string().required('A cidade é obrigatória'),
          neighborhood: Yup.string().required('O bairro é obrigatório'),
          street: Yup.string().required('A rua é obrigatória'),
          establishmentNumber: Yup.string().required('O número do estabelecimento é obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        // Validation passed

        dispatch(register(data));
      } catch (err) {
        const validationErrors = {};
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach((error) => {
            Reflect.set(validationErrors, error.path, error.message);
          });
          formRef.current.setErrors(validationErrors);
        }
      }
    } else {
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
        if (userType === 'establishment') {
          setShowNextSection(true);
        } else {
          dispatch(register(data));
        }
      } catch (err) {
        const validationErrors = {};
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach((error) => {
            Reflect.set(validationErrors, error.path, error.message);
          });
          formRef.current.setErrors(validationErrors);
        }
      }
    }
  };
  return (
    <Container>
      <StatusBar style="auto" />
      <HeaderText>Cadastrar</HeaderText>
      <Form style={{ flex: 1 }} ref={formRef} onSubmit={handleSubmit}>
        <InputsContainer>
          {showNextSection ? (
            <>
              <Input label="CEP" name="cep" />
              <Input label="Estado" name="state" />
              <Input label="Cidade" name="city" />
              <Input label="Bairro" name="neighborhood" />
              <Input label="Rua" name="street" />
              <Input label="Número" name="establishmentNumber" />
            </>
          ) : (
            <>
              <SelectOption optionSelected={userType} onSelect={(type) => setUserType(type)} />
              <Input style={{ marginTop: 36 }} label="Nome" name="name" />
              <Input label="Email" name="email" keyboardType="email-address" />
              <Input label="Telefone" name="phone" keyboardType="phone-pad" />
              <Input label="Senha" name="password" isPassword />
            </>
          )}
        </InputsContainer>
        <ActionsContainer>
          <CustomButton text="Criar" onPress={() => formRef.current.submitForm()} />
          {showNextSection && (
            <CustomButton
              style={{ marginTop: 12 }}
              color={theme.colors.background.lightGrey}
              text="Voltar"
              onPress={() => setShowNextSection(false)}
            />
          )}
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
