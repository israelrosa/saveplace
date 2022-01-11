import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string,
    text: {
      primary: string,
      secondary: string,
      neutral: string,
    },
    border: string,
    background: {
      main: string,
      lightBlue: string,
      darkestBlue: string,
      darkBlue: string,
      grey: string,
      darkGrey: string,
      button: string,
    },
  }
}