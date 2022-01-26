import styled from 'styled-components';

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.Text<ContainerProps>`
  height: 32px;
  width: 32px;
  padding: 4px 0 0 4px;
  border-radius: 200px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.backgroundColor || 'transparent'};
`;
