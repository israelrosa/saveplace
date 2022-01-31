import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  width: 100%;
  padding: 0 24px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
  border-radius: 8px;
  margin-bottom: 8px;
  background-color: #ffffff;
`;

export const Text = styled.Text`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fonts.section.main.fontSize}px;
  font-family: ${(props) => props.theme.fonts.section.main.fontFamily};
  margin-left: 24px;
  flex: 1;
`;