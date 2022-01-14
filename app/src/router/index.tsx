import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Profile from 'screens/Profile';
import QueueDetails from 'screens/QueueDetails';
import SignIn from '../screens/SignIn';
import SignOn from '../screens/SignOn';

const Stack = createNativeStackNavigator();

const Router = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="QueueDetails" component={QueueDetails} />
      <Stack.Screen name="SignOn" component={SignOn} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Router;
