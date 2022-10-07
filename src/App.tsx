import { ChakraProvider } from '@chakra-ui/react';
import { Lobby } from 'components/Lobby';

const App = (): JSX.Element => {
  return (
    <ChakraProvider resetCSS={false}>
      <Lobby />
    </ChakraProvider>
  );
};

export default App;
