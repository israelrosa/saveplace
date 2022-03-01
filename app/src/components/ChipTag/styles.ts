/* eslint-disable no-confusing-arrow */
import styled from 'styled-components/native';

interface ContainerProps {
  selected: boolean;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  padding: 0 24px;
  margin-right: 4px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    props.selected ? props.theme.colors.background.darkestBlue : props.theme.colors.primary};
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const ContentText = styled.Text`
  color: ${(props) => props.theme.colors.text.reverse};
  font-size: ${(props) => props.theme.fonts.spanBold.fontSize}px;
  font-family: ${(props) => props.theme.fonts.spanBold.fontFamily};
`;
