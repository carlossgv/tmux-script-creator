import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import React from 'react';
import getDesignTokens from './palettes';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

const ColorModeContextProvider = ({ children }: { children: any }) => {
  const [mode, setMode] = React.useState<PaletteMode>('dark');
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light'
        );
      },
    }),
    []
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export { ColorModeContextProvider, ColorModeContext };
