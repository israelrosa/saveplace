import React from 'react';
import { Provider } from 'react-redux';
import Router from 'router';
import { ThemeProvider } from 'styled-components';
import { Provider as PaperProvider } from 'react-native-paper';
// import dark from './src/styles/themes/dark';
import * as openSans from '@expo-google-fonts/open-sans';
import light from './src/styles/themes/light';
import fonts from './src/styles/themes/fonts';
import { store } from './src/store';

const App = () => {
  const theme = {
    colors: light,
    fonts,
  };
  const [isFontLoaded] = openSans.useFonts({
    OpenSans_300Light: openSans.OpenSans_300Light,
    OpenSans_300Light_Italic: openSans.OpenSans_300Light_Italic,
    OpenSans_400Regular: openSans.OpenSans_400Regular,
    OpenSans_400Regular_Italic: openSans.OpenSans_400Regular_Italic,
    OpenSans_600SemiBold: openSans.OpenSans_600SemiBold,
    OpenSans_600SemiBold_Italic: openSans.OpenSans_600SemiBold_Italic,
    OpenSans_700Bold: openSans.OpenSans_700Bold,
    OpenSans_700Bold_Italic: openSans.OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold: openSans.OpenSans_800ExtraBold,
    OpenSans_800ExtraBold_Italic: openSans.OpenSans_800ExtraBold_Italic,
  });

  return (
    <Provider store={store}>
      <PaperProvider>
        <ThemeProvider theme={theme}>{isFontLoaded && <Router />}</ThemeProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
