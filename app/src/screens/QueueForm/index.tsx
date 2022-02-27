import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import UilAngleLeft from '@iconscout/react-native-unicons/icons/uil-angle-left-b';
import { useNavigation } from '@react-navigation/native';
import Input from 'components/Input';
import { Form } from '@unform/mobile';
import { Switch } from 'react-native-paper';
import Option from 'components/Option';
import CustomButton from 'components/CustomButton';
import SelectInput from 'components/SelectInput';
import * as Yup from 'yup';
import { useAppDispatch } from 'hooks/storeHook';
import { createQueue } from 'store/actions/queueActions';
import Modal from 'components/Modal';
import {
  ActionsContainer,
  Container,
  Content,
  Header,
  HeaderGoBack,
  HeaderText,
  ModalContainer,
  Section,
} from './styles';

const QueueForm: React.FC = () => {
  const theme = useTheme();
  const formRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = async (data) => {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        queueName: Yup.string().required('O nome da fila é obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      console.log(data);

      // Validation passed
      setIsLoading(true);
      dispatch(createQueue({
        name: data.queueName,
        status: status ? 'active' : 'disabled'
      })).then((id) => {
        console.log(id);
        setIsLoading(false);
      }).catch((err) => {
        console.log(err);
      });
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
          <SelectInput placeholder="Selecione a tag" onPress={() => setOpenModal(true)} />
          <Section style={{ marginTop: 24 }}>Status</Section>
          <Option hideArrowRight text="Aberto" iconRight={<Switch value={status} onValueChange={(value) => setStatus(value)} />} />
        </Form>
      </Content>
      <ActionsContainer>
        <CustomButton
          color={theme.colors.primary}
          text="Criar"
          isLoading={isLoading}
          onPress={() => formRef.current.submitForm()}
        />
      </ActionsContainer>
      {openModal && (
        <ModalContainer>
          <Modal title="Tags" onClose={() => setOpenModal(false)} />
        </ModalContainer>
      )}
    </Container>
  );
};

export default QueueForm;
