import { linearProgressClasses, PaletteMode } from '@mui/material';
import { grey, lightBlue, lime, pink } from '@mui/material/colors';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#e91e63',
          },
          divider: pink[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: lightBlue[200],
          },
          secondary: lime,
          background: {
            paper: '#212121',
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },
});

export default getDesignTokens;
