import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import CustomButton from 'components/CustomButton';
import { Keyboard, TouchableOpacity } from 'react-native';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import SelectOption from 'components/SelectOption';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import { register } from 'store/actions/authenticationActions';
import { useTheme } from 'styled-components';
import { cepApi } from 'services/api';
import {
  ActionsContainer,
  Container,
  InputsContainer,
  TextButton,
  HeaderText,
  InputGroup,
} from './styles';
import Input from '../../components/Input';

const SignOn: React.FC = () => {
  const formUserRef = useRef();
  const formLocationRef = useRef();
  const navigator = useNavigation();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [locationData, setLocationData] = useState({});
  const [userData, setUserData] = useState({});
  const [userType, setUserType] = useState('client');
  const [showNextSection, setShowNextSection] = useState(false);
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
    setIsLoading(auth.isLoading);
  }, [auth]);

  const handleSubmit = async (data) => {
    if (showNextSection) {
      try {
        // Remove all previous errors
        formLocationRef.current.setErrors({});
        const schema = Yup.object().shape({
          cep: Yup.string().required('O CEP é obrigatório'),
          establishmentNumber: Yup.string().required('O número do estabelecimento é obrigatório'),
          complement: Yup.string().optional(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        // Validation passed
        console.log(locationData);
        setIsLoading(true);
        dispatch(
          register({
            ...locationData,
            ...userData,
            type: userType,
            establishmentNumber: data.establishmentNumber,
            complement: data.complement,
          })
        ).then(() => {
          navigator.navigate('SignIn');
        });
      } catch (err) {
        const validationErrors = {};
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach((error) => {
            Reflect.set(validationErrors, error.path, error.message);
          });
          formLocationRef.current.setErrors(validationErrors);
        }
      }
    } else {
      try {
        // Remove all previous errors
        formUserRef.current.setErrors({});
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
        console.log(data);

        // Validation passed
        if (userType === 'establishment') {
          setUserData(data);
          setShowNextSection(true);
        } else {
          setIsLoading(true);

          dispatch(register({ ...data, type: userType })).then(() => {
            navigator.navigate('SignIn');
          });
        }
      } catch (err) {
        const validationErrors = {};
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach((error) => {
            Reflect.set(validationErrors, error.path, error.message);
          });
          formUserRef.current.setErrors(validationErrors);
        }
      }
    }
  };

  const handleFindCep = useCallback(
    (text: string) => {
      if (text.length === 8) {
        cepApi
          .get(`/${text}`)
          .then((result) => {
            console.log(result.data);
            const { cep, state, city, neighborhood, street, location } = result.data;
            setLocationData({
              cep,
              state,
              city,
              neighborhood,
              street,
              ...location.coordinates,
            });
          })
          .catch(() => {
            formLocationRef.current.setErrors({ cep: 'Cep inválido' });
            setLocationData({});
          });
      } else {
        setLocationData({});
      }
    },
    [cepApi]
  );

  return (
    <Container>
      <StatusBar style="auto" />
      <HeaderText>Cadastrar</HeaderText>
      {showNextSection ? (
        <Form style={{ flex: 1 }} ref={formLocationRef} onSubmit={handleSubmit}>
          <InputsContainer>
            <InputGroup>
              <Input
                label="CEP"
                name="cep"
                style={{ flex: 1 }}
                defaultValue={locationData.cep}
                onChangeText={handleFindCep}
              />
              <Input
                value={locationData?.state || ''}
                label="Estado"
                style={{ width: '30%', marginLeft: 12 }}
                name="state"
                defaultValue=""
                disabled
              />
            </InputGroup>
            <Input
              value={locationData?.city || ''}
              label="Cidade"
              name="city"
              defaultValue=""
              disabled
            />
            <Input
              value={locationData?.neighborhood || ''}
              label="Bairro"
              name="neighborhood"
              defaultValue=""
              disabled
            />
            <Input
              value={locationData?.street || ''}
              label="Rua"
              name="street"
              defaultValue=""
              disabled
            />
            <Input label="Número" name="establishmentNumber" defaultValue="" />
            <Input label="Complemento" name="complement" defaultValue="" />
          </InputsContainer>
          {!keyboardIsOpen && (
            <ActionsContainer>
              <CustomButton
                text="Criar"
                onPress={() => formLocationRef.current.submitForm()}
                isLoading={isLoading}
              />
              <CustomButton
                style={{ marginTop: 12 }}
                color={theme.colors.background.lightGrey}
                text="Voltar"
                onPress={() => setShowNextSection(false)}
              />
            </ActionsContainer>
          )}
        </Form>
      ) : (
        <Form initialData={userData} style={{ flex: 1 }} ref={formUserRef} onSubmit={handleSubmit}>
          <SelectOption optionSelected={userType} onSelect={(type) => setUserType(type)} />
          <InputsContainer>
            <Input
              style={{ marginTop: 36 }}
              label="Nome"
              name="name"
              onFocus={() => setKeyboardIsOpen(true)}
            />
            <Input label="Email" name="email" keyboardType="email-address" />
            <Input label="Telefone" name="phone" keyboardType="phone-pad" />
            <Input label="Senha" name="password" isPassword />
          </InputsContainer>
          {!keyboardIsOpen && (
            <ActionsContainer>
              <CustomButton
                isLoading={isLoading}
                text={userType === 'client' ? 'Criar' : 'Próximo'}
                onPress={() => formUserRef.current.submitForm()}
              />
              <TouchableOpacity
                style={{ width: '100%', alignItems: 'center', marginTop: 32 }}
                onPress={() => navigator.navigate('SignIn')}
              >
                <TextButton>Já tenho uma conta</TextButton>
              </TouchableOpacity>
            </ActionsContainer>
          )}
        </Form>
      )}
    </Container>
  );
};

export default SignOn;
