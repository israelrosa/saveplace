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

export const HeaderText = styled.Text`
  color: ${(props) => props.theme.colors.text.reverse};
  font-size: ${(props) => props.theme.fonts.subTitle.fontSize}px;
  font-family: ${(props) => props.theme.fonts.subTitle.fontFamily};
  margin-left: 12px;
`;

export const SubHeader = styled.View`
  width: 100%;
  height: 36px;
  background-color: ${(props) => props.theme.colors.background.darkestBlue};
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const SubHeaderText = styled.Text`
  color: ${(props) => props.theme.colors.text.reverse};
  font-size: ${(props) => props.theme.fonts.spanBold.fontSize}px;
  font-family: ${(props) => props.theme.fonts.spanBold.fontFamily};
`;

export const CardsContainer = styled.ScrollView`
  flex: 1;
  padding: 24px;
`;

export const Card = styled.View`
  flex: 1;
  background-color: #ffffff;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
`;

export const CardAvatar = styled.Image`
  border-radius: 4px;
  height: 60px;
  width: 60px;
`;

export const CardBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 12px;
`;

export const CardSpan = styled.Text`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.fonts.spanBold.fontSize}px;
  font-family: ${(props) => props.theme.fonts.spanBold.fontFamily};
`;

export const CardSection = styled.Text`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fonts.section.fontSize}px;
  font-family: ${(props) => props.theme.fonts.section.fontFamily};
`;

export const CardTitle = styled.Text`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fonts.title.fontSize}px;
  font-family: ${(props) => props.theme.fonts.title.fontFamily};
`;

export const CardHero = styled.Text`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fonts.hero.fontSize}px;
  font-family: ${(props) => props.theme.fonts.hero.fontFamily};
`;

export const ActionsContainer = styled.View`
  padding: 0 24px 24px 24px;
`;
