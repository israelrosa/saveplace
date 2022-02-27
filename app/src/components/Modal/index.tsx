import React from 'react';
import UilCloseIcon from '@iconscout/react-native-unicons/icons/uil-times';
import { useTheme } from 'styled-components';
import { ButtonClose, Container, ItemContent, ItemName, ModalContainer, ModalHeader, ModalTitle } from './styles';

interface ModalProps {
  onClose: () => boolean;
  title: string;
  items: {
    id: string;
    name: string;
  }[]
}

const Modal: React.FC<ModalProps> = ({ onClose, title, items }) => {
  const theme = useTheme();
  return (
    <Container>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ButtonClose onPress={onClose}>
            <UilCloseIcon fill={theme.colors.text.primary} />
          </ButtonClose>
        </ModalHeader>
        <ModalContainer>
          {items && items.map((item) => (
            <ItemContent>
              <ItemName>{item.name}</ItemName>
            </ItemContent>
          ))}
        </ModalContainer>
      </ModalContainer>
    </Container>
  );
};

export default Modal;
