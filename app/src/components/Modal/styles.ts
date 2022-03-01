import styled from 'styled-components/native';

export const Container = styled.View`
  position: absolute;
  height: 100%;
  width: 100%;
  bottom: 0;
  justify-content: flex-end;
`;

export const ModalContainer = styled.View`
  background-color: ${(props) => props.theme.colors.text.reverse};
  border-top-right-radius: 24px;
  border-top-left-radius: 24px;
  min-height: 390px;
  height: 55%;
  overflow: hidden;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  padding-top: 24px;
  padding-bottom: 24px;
  padding-left: 24px;
  padding-right: 24px;
  align-items: center;
  justify-content: space-between;
`;

export const ModalTitle = styled.Text`
  font-family: ${(props) => props.theme.fonts.subTitle.fontFamily};
  font-size: ${(props) => props.theme.fonts.subTitle.fontSize}px;
  color: ${(props) => props.theme.colors.text.primary};
`;

export const ModalContent = styled.ScrollView`
  margin: 0 24px;
`;

export const ButtonClose = styled.TouchableOpacity`
  opacity: 0.3;
`;

export const ItemContent = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.border};
`;

export const ItemName = styled.Text`
  font-family: ${(props) => props.theme.fonts.spanBold.fontFamily};
  font-size: ${(props) => props.theme.fonts.spanBold.fontSize}px;
  color: ${(props) => props.theme.colors.text.primary};
`;
