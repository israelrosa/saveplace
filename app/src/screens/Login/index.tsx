import React from 'react';

import {Container} from './styles';
import Input from '../../components/Input'
import {StatusBar} from 'expo-status-bar'

const Login: React.FC = () => {
  return <Container >
    <StatusBar></StatusBar>
    <Input/>
  </Container>
};

export default Login;
