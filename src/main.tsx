import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { theme } from './theme';
import Home from './components/lobby/Home';
import P2PGame from './components/lobby/P2PGame';
import LocalGame from './components/lobby/LocalGame';
import BotGame from './components/lobby/BotGame';

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
    path: '/bot',
    element: <BotGame />,
  },
  {
    path: '/:matchID',
    element: <P2PGame />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
