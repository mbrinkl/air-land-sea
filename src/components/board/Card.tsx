import { Box } from '@chakra-ui/react';
import { theme } from 'config/theme';
import { CardInfo } from 'game/cards';
import { useBoardContext } from './Board';

interface Props {
  info: CardInfo;
  deployed?: 'self' | 'opponent';
}

export const Card = ({ info, deployed }: Props) => {
  const { G, moves, playerID } = useBoardContext();
  const { theater, strength, name, faceDown } = info;

  const cardDisplay = faceDown ? strength : `${strength} ${name}`;

  function getCardId(): number {
    return G.players[Number(playerID)].cards.findIndex(
      (c) => c.theater === theater && c.name === name,
    );
  }

  return (
    <Box
      w="75px"
      h="125px"
      bg={faceDown ? theme['faceDown'] : theme[theater]}
      border="2px solid black"
      color="white"
      borderRadius="10%"
      cursor="pointer"
      margin={deployed != null ? '-50px' : '0'}
      onClick={!deployed ? () => moves.selectCard(getCardId()) : undefined}
      tabIndex={0}
    >
      {cardDisplay}
    </Box>
  );
};
