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
  height: 68px;
  background-color: ${(props) => props.theme.colors.primary};
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const HeaderImage = styled.Image`
  width: 36px;
  height: 36px;
  border-width: 1px;
  border-color: #ffffff;
  border-radius: 4px;
`;

export const HeaderTitle = styled.Text`
  color: ${(props) => props.theme.colors.text.reverse};
  font-size: ${(props) => props.theme.fonts.subTitle.fontSize}px;
  font-family: ${(props) => props.theme.fonts.subTitle.fontFamily};
  margin-left: 12px;
`;
