import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { ColorModeContextProvider } from '../styles/ColorModeContextProvider';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ColorModeContextProvider>
      <div>
        <Component {...pageProps} />
        <style global jsx>{`
          html,
          body,
          body > div:first-child,
          div#__next,
          div#__next > div {
            height: 100%;
          }
        `}</style>
      </div>
    </ColorModeContextProvider>
  );
};

export default MyApp;
