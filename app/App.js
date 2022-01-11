import React from 'react';
import Router from 'router';
import {ThemeProvider} from 'styled-components';
// import dark from './src/styles/themes/dark';
import * as openSans from '@expo-google-fonts/open-sans';
import light from './src/styles/themes/light';

const App = () => {
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
  return <ThemeProvider theme={light}>{isFontLoaded && <Router />}</ThemeProvider>;
};

export default App;
