import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red: string;
    black: {
      veryDark: string;
      darker: string;
      lighter: string;
    };
    white: {
      darker: string;
      lighter: string;
    };
    voteDown: {
      lighter: string;
      darker: string;
      veryDark: string;
    };
    voteUp: {
      lighter: string;
      darker: string;
      veryDark: string;
    };
  }
}
