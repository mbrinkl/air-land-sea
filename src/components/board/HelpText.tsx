import { Text } from '@chakra-ui/react';
import { useBoardContext } from '../../hooks/useBoardContext';

const HelpText = (): JSX.Element => {
  const { isActive, ctx } = useBoardContext();

  const stage: string | null =
    (ctx.activePlayers && ctx.activePlayers[ctx.currentPlayer]) || null;

  let text = 'Waiting for Opponent...';

  if (isActive) {
    if (stage === 'select') {
      text = 'Select a Card';
    } else if (stage === 'place') {
      text = 'Place Selected Card';
    } else {
      text = stage ?? 'null stage';
    }
  }

  return (
    <Text fontSize="lg" textAlign="center">
      {text}
    </Text>
  );
};

export default HelpText;
