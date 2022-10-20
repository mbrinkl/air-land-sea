import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { wrapper } from '../store';
import { theme } from 'config/theme';

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <>
      <Head>
        <title>Air, Land, & Sea</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Component {...props.pageProps} />
        </ChakraProvider>
      </Provider>
    </>
  );
};

export default App;
