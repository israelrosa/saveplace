import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import Profile from 'screens/Profile';
import QueueDetails from 'screens/QueueDetails';
import Search from 'screens/Search';
import { useTheme } from 'styled-components';
import UilUserCircle from '@iconscout/react-native-unicons/icons/uil-user-circle';
import UilUsers from '@iconscout/react-native-unicons/icons/uil-users-alt';
import Queues from 'screens/Queues';
import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import QueueForm from 'screens/QueueForm';
import { getUserInfo } from 'store/actions/userActions';
import UilHome from '../icons/UilHome';
import SignIn from '../screens/SignIn';
import SignOn from '../screens/SignOn';
import { Container } from './styles';

const Stack = createNativeStackNavigator();
const RoutesStack = createBottomTabNavigator();

const QueueEstablishmentRoutes = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Queues" component={Queues} />
    <Stack.Screen name="QueueForm" component={QueueForm} />
    <Stack.Screen name="QueueDetailsEstablishment" component={QueueDetails} />
  </Stack.Navigator>
);

const Routes = () => {
  const { user } = useAppSelector((state) => state);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const theme = useTheme();
  return (
    <RoutesStack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.text.reverse,
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: theme.colors.text.primary,
        tabBarShowLabel: false,
        tabBarStyle: {
          shadowOpacity: 0,
          elevation: 0,
          backgroundColor: theme.colors.background.main,
          borderTopColor: 'transparent',
        },
      }}
    >
      {user.data.type === 'establishment' ? (
        <RoutesStack.Screen
          name="QueuesEstablishments"
          component={QueueEstablishmentRoutes}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Container backgroundColor={focused && theme.colors.primary}>
                <UilUsers color={color} size={24} />
              </Container>
            ),
          }}
        />
      ) : (
        <>
          <RoutesStack.Screen
            name="Search"
            component={Search}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Container backgroundColor={focused && theme.colors.primary}>
                  <UilHome color={color} size={24} />
                </Container>
              ),
            }}
          />
          <RoutesStack.Screen
            name="QueueDetails"
            component={QueueDetails}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Container backgroundColor={focused && theme.colors.primary}>
                  <UilUsers color={color} size={24} />
                </Container>
              ),
            }}
          />
        </>
      )}
      <RoutesStack.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Container backgroundColor={focused && theme.colors.primary}>
              <UilUserCircle color={color} size={24} />
            </Container>
          ),
        }}
      />
    </RoutesStack.Navigator>
  );
};
const Router = () => {
  const { auth, user } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth.isLoggedIn) {
      dispatch(getUserInfo());
    }
  }, [auth]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {auth.isLoggedIn && user?.data?.type ? (
          <Stack.Screen name="Routes" component={Routes} />
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignOn" component={SignOn} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Router;
