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
  height: 15%;
  background-color: ${(props) => props.theme.colors.primary};
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const HeaderImage = styled.Image`
  width: 124px;
  height: 124px;
  border-width: 1px;
  border-color: #ffffff;
  border-radius: 4px;
`;

export const ContentContainer = styled.View`
  top: -9%;
  padding: 0 24px;
  flex: 1;
  align-items: center;
`;

export const Name = styled.Text`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fonts.subTitle.fontSize}px;
  font-family: ${(props) => props.theme.fonts.subTitle.fontFamily};
  margin-top: 12px;
  margin-bottom: 32px;
`;
