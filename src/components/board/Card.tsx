import { Box } from '@chakra-ui/react';
import { theme } from 'config/theme';
import { Card as GameCard } from 'game/cards';
import { useBoardContext } from './Board';
import { css } from '@emotion/react';

interface Props {
  card: GameCard;
  deployed?: 'self' | 'opponent';
  setDesc?: (desc: string) => void;
}

const Card = ({ card, deployed, setDesc }: Props) => {
  const { G, moves, playerID } = useBoardContext();
  const { cardInfo, strength, faceDown } = card;
  const { name, desc, theater } = cardInfo;

  const cardDisplay = faceDown ? strength : `${strength} ${name}`;

  function getCardId(): number {
    return G.players[Number(playerID)].cards.findIndex(
      (c) => c.cardID === card.cardID,
    );
  }

  const description =
    deployed === 'opponent' && faceDown ? '' : `${name} (${strength}): ${desc}`;

  return (
    <Box
      w="75px"
      h="125px"
      bg={faceDown ? theme['faceDown'] : theme[theater]}
      border="2px solid black"
      color="white"
      borderRadius="10%"
      cursor="pointer"
      marginRight={deployed != null ? '-50px' : '0'}
      onClick={!deployed ? () => moves.selectCard(getCardId()) : undefined}
      tabIndex={0}
      css={css`
        transition-duration: 0.3s;
        transition-property: transform;
        &:hover {
          transform: scale(1.1);
        }
      `}
      onMouseOver={() => (setDesc ? setDesc(description) : undefined)}
      onMouseOut={() => (setDesc ? setDesc('') : undefined)}
    >
      {cardDisplay}
    </Box>
  );
};

export default Card;
