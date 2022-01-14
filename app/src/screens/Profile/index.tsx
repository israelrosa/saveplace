import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useTheme } from 'styled-components';

import { Container, Header } from './styles';

const Profile: React.FC = () => {
  const theme = useTheme();

  return (
    <Container>
      <StatusBar backgroundColor={theme.colors.primary} style="light" />
      <Header />
    </Container>
  );
};

export default Profile;
