/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';

interface OptionProps {
  isSelected: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.background.lightBlue};
  height: 56px;
  overflow: hidden;
  border-radius: 4px;
  border-color: ${props => props.theme.colors.border};
  border-width: 1px;
`;

export const Option = styled.TouchableOpacity<OptionProps>`
  flex: 1;
  background-color: ${(props) => (props.isSelected ? props.theme.colors.background.darkGrey : 'transparent')};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

export const OptionText = styled.Text<OptionProps>`
  color: ${(props) => (props.isSelected ? props.theme.colors.primary : props.theme.colors.text.neutral)};
  font-size: ${(props) => props.theme.fonts.spanBold.fontSize}px;
  font-family: ${(props) => props.theme.fonts.spanBold.fontFamily};
`;
