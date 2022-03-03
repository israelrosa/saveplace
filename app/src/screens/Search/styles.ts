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
  height: 94px;
  background-color: ${(props) => props.theme.colors.primary};
  padding: 0 24px;
`;

export const HeaderText = styled.Text`
  color: ${(props) => props.theme.colors.text.reverse};
  font-size: ${(props) => props.theme.fonts.subTitle.fontSize}px;
  font-family: ${(props) => props.theme.fonts.subTitle.fontFamily};
  margin-top: 12px;
  margin-bottom: 24px;
`;

export const FiltersContainer = styled.ScrollView`
  flex-direction: row;
  margin-top: 42px;
  height: 44px;
  max-height: 44px;
`;

export const Content = styled.ScrollView`
  padding: 24px;
`;
