import React from 'react';
import UilCloseIcon from '@iconscout/react-native-unicons/icons/uil-times';
import { useTheme } from 'styled-components';
import { ButtonClose, Container, ItemContent, ItemName, ModalContainer, ModalContent, ModalHeader, ModalTitle } from './styles';

interface Item {
  id: string;
  name: string;
}

interface ModalProps {
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSelect: (item: Item) => void;
  title: string;
  items: Item[];
}

const Modal: React.FC<ModalProps> = ({ onClose, onSelect, title, items }) => {
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
        <ModalContent>
          {items && items.map((item) => (
            <ItemContent onPress={() => onSelect(item)} key={item.name}>
              <ItemName>{item.name}</ItemName>
            </ItemContent>
          ))}
        </ModalContent>
      </ModalContainer>
    </Container>
  );
};

export default Modal;
