import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      black: string;
      darkGray: string;
      lightGray: string;
      extraLightGray: string;
      extraExtraLightGray: string;
      white: string;
      dark: string;
      secondaryBlue: string;
      error: string;
      hoverDark: string;
    };
  }
}
