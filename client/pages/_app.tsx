import React, {
  ReactElement,
  ReactNode,
}                             from 'react';
import { SnackbarProvider }   from 'notistack';
import { ThemeProvider }      from 'styled-components';

import type { AppProps } from 'next/app';
import type { NextPage } from 'next';

import { theme } from '../src/utils/theme';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SnackbarProvider dense autoHideDuration={3000} maxSnack={3}>
      <ThemeProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </SnackbarProvider>
  );
};

export default MyApp;
