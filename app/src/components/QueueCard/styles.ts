import styled from 'styled-components/native';

interface CaptionProps {
  color: string;
}

export const Container = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.text.reverse};
`;

export const Content = styled.View`
  flex-direction: row;
  padding: 12px;
`;

export const ContentSide = styled.View`
  flex: 1;
`;

export const ContentTag = styled.View`
  flex-direction: row;
`;

export const ContentImage = styled.Image`
  border-radius: 4px;
  height: 96px;
  width: 96px;
  margin-right: 12px;
`;

export const ContentInfo = styled.View`
  margin-left: 12px;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  height: 36px;
`;

export const Caption = styled.Text<CaptionProps>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.theme.fonts.caption.main.fontSize}px;
  font-family: ${(props) => props.theme.fonts.caption.main.fontFamily};
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fonts.subTitle.fontSize}px;
  font-family: ${(props) => props.theme.fonts.subTitle.fontFamily};
`;

export const Footer = styled.View`
  justify-content: center;
  align-items: center;
  padding: 12px;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.background.lightBlue};
`;

export const FooterInfo = styled.View`
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.background.main};
  padding: 12px;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
`;

export const FooterTextNumber = styled.Text`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fonts.section.bold.fontSize}px;
  font-family: ${(props) => props.theme.fonts.section.bold.fontFamily};
`;

export const FooterText = styled.Text`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fonts.caption.bold.fontSize}px;
  font-family: ${(props) => props.theme.fonts.caption.bold.fontFamily};
`;
