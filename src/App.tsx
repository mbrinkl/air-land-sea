import { ChakraProvider } from '@chakra-ui/react';
import Lobby from './components/lobby/Home';
import { theme } from './config/theme';
import { Provider } from 'react-redux';
import { store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Lobby />
      </ChakraProvider>
    </Provider>
  );
};

export default App;
