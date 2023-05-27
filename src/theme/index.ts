import { createTheme } from '@mui/material/styles';
import { red, blueGrey, deepOrange } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[900],
      light: blueGrey[500]
    },
    secondary: {
      main: deepOrange[300],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;