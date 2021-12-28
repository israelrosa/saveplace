import React from 'react';
import Router from 'router';
import {ThemeProvider} from 'styled-components';
// import dark from './src/styles/themes/dark';
import * as ubuntu from '@expo-google-fonts/ubuntu';
import light from './src/styles/themes/light';

const App = () => {
  const [isFontLoaded] = ubuntu.useFonts({
    Ubuntu_300Light: ubuntu.Ubuntu_300Light,
    Ubuntu_300Light_Italic: ubuntu.Ubuntu_300Light_Italic,
    Ubuntu_400Regular: ubuntu.Ubuntu_400Regular,
    Ubuntu_400Regular_Italic: ubuntu.Ubuntu_400Regular_Italic,
    Ubuntu_500Medium: ubuntu.Ubuntu_500Medium,
    Ubuntu_500Medium_Italic: ubuntu.Ubuntu_500Medium_Italic,
    Ubuntu_700Bold: ubuntu.Ubuntu_700Bold,
    Ubuntu_700Bold_Italic: ubuntu.Ubuntu_700Bold_Italic,
  });
  return <ThemeProvider theme={light}>{isFontLoaded && <Router />}</ThemeProvider>;
};

export default App;
