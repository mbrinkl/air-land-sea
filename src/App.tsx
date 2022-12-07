import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './store';
import { theme } from './config/theme';
import Home from './components/lobby/Home';
import SocketGame from './components/lobby/SocketGame';
import LocalGame from './components/lobby/LocalGame';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/local',
    element: <LocalGame />,
  },
  {
    path: '/:matchID',
    element: <SocketGame />,
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  );
};

export default App;
