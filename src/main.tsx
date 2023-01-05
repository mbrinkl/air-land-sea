import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './store';
import { theme } from './theme';
import Home from './components/lobby/Home';
import P2PGame from './components/lobby/P2PGame';
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
    element: <P2PGame />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
);
