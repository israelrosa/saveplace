import styled from 'styled-components/native';
import { StatusBar } from 'react-native';

export const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background.main};
  padding-top: ${StatusBar.currentHeight}px;
`;
export const Header = styled.View`
  width: 100%;
  height: 120px;
  background-color: ${(props) => props.theme.colors.primary};
  flex-direction: row;
`;

export const HeaderText = styled.Text`
  color: ${(props) => props.theme.colors.text.reverse};
  font-size: ${(props) => props.theme.fonts.subTitle.fontSize}px;
  font-family: ${(props) => props.theme.fonts.subTitle.fontFamily};
  margin-left: 24px;
  margin-top: 12px;
`;
