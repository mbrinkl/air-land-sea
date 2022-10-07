import { Text } from '@chakra-ui/react';
import { useBoardContext } from './Board';

export const HelpText = (): JSX.Element => {
  const { isActive, ctx } = useBoardContext();

  const stage: string | null =
    (ctx.activePlayers && ctx.activePlayers[ctx.currentPlayer]) || null;

  // todo: make more descriptive
  const text = isActive ? `${ctx.phase} : ${stage}` : 'Waiting for Opponent...';

  return (
    <Text fontSize="3xl" margin="0.5em">
      {text}
    </Text>
  );
};
