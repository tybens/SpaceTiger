import { createTheme } from "@mui/material/styles";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const breakpoints = createBreakpoints({
  values: {
    xs: 475,
    sm: 600,
    smmd: 760,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
});

const theme = createTheme({
  breakpoints: breakpoints,

  palette: {
    primary: {
      main: "rgb(0,0,0)",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },

  typography: {
    fontFamily: "Inter",
    h3: {
      // SpaceTiger logo
      fontSize: "2.5rem",
    },
    h4: {
      // headers for details + profile page
      fontFamily: "Roboto",
      fontWeight: 600,
    },

    h6: {
      fontFamily: "Roboto",
      fontWeight: 300,
    }
  },
});

export default theme;
