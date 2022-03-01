import Option from 'components/Option';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useTheme } from 'styled-components';
import UilUserCircle from '@iconscout/react-native-unicons/icons/uil-user-circle';
import UilUsersAlt from '@iconscout/react-native-unicons/icons/uil-users-alt';

import UilExit from 'icons/UilExit';
import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import { logout } from 'store/actions/authenticationActions';
import { persistor } from 'store';
import { Container, ContentContainer, Header, HeaderImage, Name } from './styles';

const Profile: React.FC = () => {
  const theme = useTheme();
  const { user } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
  };

  return (
    <Container>
      <StatusBar backgroundColor={theme.colors.primary} style="light" />
      <Header />
      <ContentContainer>
        <HeaderImage
          source={{
            uri: 'http://www.stevnserhvervsraad.dk/wp-content/uploads/blank-avatar.png',
          }}
        />
        <Name>{user.data.name}</Name>
        <Option
          iconLeft={<UilUserCircle size={30} color={theme.colors.text.primary} />}
          text="Conta"
        />
        <Option
          iconLeft={<UilUsersAlt size={30} color={theme.colors.text.primary} />}
          text="Filas"
        />
        <Option
          iconLeft={<UilExit size={30} color={theme.colors.text.primary} />}
          text="Sair"
          hideArrowRight
          onPress={handleLogout}
        />
      </ContentContainer>
    </Container>
  );
};

export default Profile;
