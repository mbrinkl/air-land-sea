import { Box, Text } from '@chakra-ui/react';
import { useBoardContext } from '../../hooks/useBoardContext';
import { useBoardStore } from '../../hooks/useBoardStore';

const HelpText = (): JSX.Element => {
  const hoveredCardInfo = useBoardStore((s) => s.hoveredCardInfo);
  const { isActive, ctx } = useBoardContext();

  const stage: string | null =
    (ctx.activePlayers && ctx.activePlayers[ctx.currentPlayer]) || null;

  let helpText = 'Waiting for Opponent...';

  if (isActive) {
    if (stage === 'select') {
      helpText = 'Select a Card';
    } else if (stage === 'place') {
      helpText = 'Place Selected Card';
    } else {
      helpText = stage ?? 'null stage';
    }
  }

  return (
    <Box textAlign="center">
      <Text fontSize="lg">{helpText}</Text>
      <Text>{hoveredCardInfo.length > 0 ? hoveredCardInfo : '\u00A0'}</Text>
    </Box>
  );
};

export default HelpText;
