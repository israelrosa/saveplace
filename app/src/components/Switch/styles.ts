/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';

interface OptionProps {
  isSelected: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.background.darkBlue};
  height: 56px;
  border-radius: 4px;
  overflow: hidden;
`;

export const Option = styled.TouchableOpacity<OptionProps>`
  flex: 1;
  background-color: ${(props) => (props.isSelected ? props.theme.colors.background.darkestBlue : 'transparent')};
  justify-content: center;
  align-items: center;
`;

export const OptionText = styled.Text<OptionProps>`
  color: ${(props) => props.theme.colors.text.reverse};
  font-size: ${(props) => props.theme.fonts.spanBold.fontSize}px;
  font-family: ${(props) => props.theme.fonts.spanBold.fontFamily};
`;
