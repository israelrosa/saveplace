import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: 56px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background.grey};
  border-color: ${(props) => props.theme.colors.text.neutral};
  border-width: 1px;
  border-radius: 4px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  margin-left: 12px;
`;

export const Icon = styled.View`
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;
