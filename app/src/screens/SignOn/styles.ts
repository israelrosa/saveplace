import styled from 'styled-components/native';
import { StatusBar } from 'react-native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background.main};
  padding-top: ${StatusBar.currentHeight}px;
`;

export const HeaderText = styled.Text`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fonts.title.fontSize}px;
  font-family: ${(props) => props.theme.fonts.title.fontFamily};
  padding: 0 24px;
  margin-bottom: 24px;
`;

export const InputsContainer = styled.ScrollView`
  flex: 1;
  padding: 0 24px;
`;

export const InputGroup = styled.View`
  flex-direction: row;
  flex: 1;
`;

export const ActionsContainer = styled.View`
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
