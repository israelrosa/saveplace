import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useTheme } from 'styled-components';
import UilAngleLeft from '@iconscout/react-native-unicons/icons/uil-angle-left-b';
import UilTrash from '@iconscout/react-native-unicons/icons/uil-trash';
import { useNavigation, useRoute } from '@react-navigation/native';
import Input from 'components/Input';
import { Form } from '@unform/mobile';
import { Switch } from 'react-native-paper';
import Option from 'components/Option';
import CustomButton from 'components/CustomButton';
import SelectInput from 'components/SelectInput';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import { createQueue, deleteQueue, updateQueue } from 'store/actions/queueActions';
import Modal from 'components/Modal';
import { getTags } from 'store/actions/tagActions';
import {
  ActionsContainer,
  Container,
  Content,
  Header,
  HeaderAction,
  HeaderText,
  ModalContainer,
  Section,
} from './styles';

const QueueForm: React.FC = () => {
  const theme = useTheme();
  const formRef = useRef(null);
  const navigation = useNavigation();
  const { tag, queue } = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState(false);
  const [selectedTag, setSelectedTag] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [queueName, setQueueName] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [queueId, setQueueId] = useState('');
  const route = useRoute();

  useEffect(() => {
    dispatch(getTags());
    if (route?.params?.isEditMode) {
      setQueueId(queue.queueDetail.id);
      setStatus(queue.queueDetail.status === 'active');
      const queueTag = tag?.data?.find(t => t.id === queue.queueDetail.tagId);
      if (queueTag) {
        setSelectedTag(queueTag);
      }
      setQueueName(queue.queueDetail.name);
    }
  }, [route.params, queue.queueDetail]);

  const handleSubmit = useCallback((data) => {
    (async () => {
      try {
        // Remove all previous errors
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          queueName: Yup.string().required('O nome da fila é obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        // Validation passed
        setIsLoading(true);
        if (route?.params?.isEditMode) {
          dispatch(updateQueue({
            queueId,
            name: data.queueName,
            tagId: selectedTag.id,
            status: status ? 'active' : 'disabled'
          })).then(() => {
            navigation.navigate('EstablishmentQueueDetails', { id: queueId });
            setIsLoading(false);
          }).catch((err) => {
            console.log(err);
          });
        } else {
          dispatch(createQueue({
            name: data.queueName,
            tagId: selectedTag.id,
            status: status ? 'active' : 'disabled'
          })).then((id) => {
            navigation.navigate('EstablishmentQueueDetails', { id });
            setIsLoading(false);
          }).catch((err) => {
            console.log(err);
          });
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
    })();
  }, [route.params, queueId, selectedTag]);

  const handleDeleteQueue = () => {
    dispatch(deleteQueue(queueId));
    navigation.navigate('Queues');
  };

  const handleSelectTags = () => {
    setOpenModal(true);
  };

  const handleSelectTag = (item) => {
    setSelectedTag(item);
    setOpenModal(false);
  };

  return (
    <Container>
      <StatusBar backgroundColor={theme.colors.primary} style="light" />
      <Header>
        <HeaderAction onPress={() => navigation.navigate('Queues')}>
          <UilAngleLeft color={theme.colors.text.reverse} size={24} />
          <HeaderText>{route?.params?.isEditMode ? 'Editar fila' : 'Criar fila'}</HeaderText>
        </HeaderAction>
        {route?.params?.isEditMode && (
          <HeaderAction onPress={handleDeleteQueue}>
            <UilTrash color={theme.colors.text.reverse} size={24} />
          </HeaderAction>
        )}
      </Header>
      <Content>
        <Form initialData={{ queueName }} ref={formRef} onSubmit={handleSubmit}>
          <Section>Detalhes</Section>
          <Input value={queueName} label="Nome da fila" name="queueName" onChangeText={text => setQueueName(text)} />
          <Section style={{ marginTop: 24 }}>Tag</Section>
          <SelectInput value={selectedTag?.name || ''} placeholder="Selecione a tag" onPress={handleSelectTags} />
          <Section style={{ marginTop: 24 }}>Status</Section>
          <Option hideArrowRight text={status ? 'Aberto' : 'Fechado'} iconRight={<Switch value={status} onValueChange={(value) => setStatus(value)} />} />
        </Form>
      </Content>
      <ActionsContainer>
        <CustomButton
          color={theme.colors.primary}
          text={route?.params?.isEditMode ? 'Enviar' : 'Criar'}
          isLoading={isLoading}
          onPress={() => formRef.current.submitForm()}
        />
      </ActionsContainer>
      {openModal && (
        <ModalContainer>
          <Modal onSelect={handleSelectTag} items={tag.data} title="Tags" onClose={() => setOpenModal(false)} />
        </ModalContainer>
      )}
    </Container>
  );
};

export default QueueForm;
