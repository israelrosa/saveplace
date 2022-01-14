import styled from 'styled-components/native';
import { StatusBar } from 'react-native';

export const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background.main};
  padding-top: ${StatusBar.currentHeight}px;
`;

export const HeaderText = styled.Text`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fonts.title.fontSize}px;
  font-family: ${(props) => props.theme.fonts.title.fontFamily};
  padding: 0 24px;
  margin-bottom: 36px;
`;

export const InputsContainer = styled.View`
  padding: 0 24px;
`;

export const ActionsContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding: 0 24px;
  margin: 34px 0;
`;

export const TextButton = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fonts.spanBold.fontSize}px;
  font-family: ${(props) => props.theme.fonts.spanBold.fontFamily};
  text-decoration: underline;
`;
