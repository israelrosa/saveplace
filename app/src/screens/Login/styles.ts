import styled from 'styled-components/native';
import {StatusBar} from 'react-native'
export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background.main};
  padding-top: ${StatusBar.currentHeight}px;
`;
