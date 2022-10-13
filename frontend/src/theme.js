import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
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
      main: blue[500],
    },
  },
});

export default theme;
