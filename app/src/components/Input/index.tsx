import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';


const Input: React.FC = () => {
  return <TextInput 
    label="Email"
    value="text"
    mode="outlined" 
    children={undefined} 
    autoComplete={false}  
  />;
}

export default Input;