import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { wrapper } from '../store';
import '../styles/globals.css';

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Head>
        <title>Air, Land, & Sea</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ChakraProvider>
        <Component {...props.pageProps} />
      </ChakraProvider>
    </Provider>
  );
};

export default App;
