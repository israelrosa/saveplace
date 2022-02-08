import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: {
      title: {
        fontSize: number,
        fontFamily: string,
      }
      subTitle: {
        fontSize: number,
        fontFamily: string,
      }
      span: {
        fontSize: number,
        fontFamily: string,
      }
      spanBold: {
        fontSize: number,
        fontFamily: string,
      }
      section: {
        main: {
          fontSize: number,
          fontFamily: string,
        }
        bold: {
          fontSize: number,
          fontFamily: string,
        }
      }
      hero: {
        fontSize: number,
        fontFamily: string,
      }
      caption: {
        main: {
          fontSize: number,
          fontFamily: string,
        }
        bold: {
          fontSize: number,
          fontFamily: string,
        }
      }
    }
    colors: {
      primary: string,
      text: {
        primary: string,
        reverse: string,
        secondary: string,
        neutral: string,
        error: string,
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
}