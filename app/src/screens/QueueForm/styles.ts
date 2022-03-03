import styled from 'styled-components/native';
import { StatusBar } from 'react-native';

export const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background.main};
  padding-top: ${StatusBar.currentHeight}px;
  position: relative;
`;

export const Header = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  padding: 24px 24px;
  border-bottom-right-radius: 40px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderText = styled.Text`
  color: ${(props) => props.theme.colors.text.reverse};
  font-size: ${(props) => props.theme.fonts.subTitle.fontSize}px;
  font-family: ${(props) => props.theme.fonts.subTitle.fontFamily};
  margin-left: 12px;
`;

export const HeaderAction = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const Content = styled.ScrollView`
  padding: 24px;
`;

export const Section = styled.Text`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fonts.section.bold.fontSize}px;
  font-family: ${(props) => props.theme.fonts.section.bold.fontFamily};
  margin-bottom: 12px;
`;
export const ActionsContainer = styled.View`
  flex: 1;
  padding: 0 24px 24px 24px;
  justify-content: flex-end;
  z-index: 0;
`;

export const ModalContainer = styled.View`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  bottom: 0;
  justify-content: flex-end;
`;
