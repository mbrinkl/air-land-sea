import { Flex, Text } from '@chakra-ui/react';
import { Controls } from './Controls';
import { HelpText } from './HelpText';

export const GameInfo = (): JSX.Element => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <HelpText />
      <Controls />
      <Text>todo: card info</Text>
    </Flex>
  );
};
