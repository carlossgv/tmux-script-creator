import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { ColorModeContextProvider } from '../styles/ColorModeContextProvider';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ColorModeContextProvider>
      <div>
        <Head>
          <title>TMUX Script Creator</title>
          <meta
            property="carlossgv@gmail.com"
            content="Easy script creator for TMUX"
            key="TMUX Script Creator"
          />
        </Head>
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
