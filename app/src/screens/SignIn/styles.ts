import styled from 'styled-components/native';
import { StatusBar } from 'react-native';

export const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background.main};
  padding-top: ${StatusBar.currentHeight}px;
  justify-content: flex-end;
`;

export const HeaderImage = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const HeaderText = styled.Text`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fonts.title.fontSize}px;
  font-family: ${(props) => props.theme.fonts.title.fontFamily};
  padding: 0 24px;
  margin-bottom: 32px;
`;

export const InputsContainer = styled.View`
  padding: 0 24px;
`;

export const ActionsContainer = styled.View`
  padding: 0 24px;
  margin: 34px 0;
`;

export const RegisterAction = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 44px;
`;

export const RegisterText = styled.Text`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.fonts.span.fontSize}px;
  font-family: ${(props) => props.theme.fonts.span.fontFamily};
  margin-right: 8px;
`;

export const TextButton = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fonts.spanBold.fontSize}px;
  font-family: ${(props) => props.theme.fonts.spanBold.fontFamily};
  text-decoration: underline;
`;
