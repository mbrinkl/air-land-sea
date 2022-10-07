import { Box } from '@chakra-ui/react';
import { theme } from 'config/theme';
import { Card as GameCard } from 'game/cards';
import { useBoardContext } from './Board';
import { css } from '@emotion/react';

interface Props {
  card: GameCard;
  deployed?: 'self' | 'opponent';
}

const Card = ({ card, deployed }: Props) => {
  const { moves } = useBoardContext();
  const { cardInfo, strength, faceDown } = card;
  const { name, theater } = cardInfo;

  const cardDisplay = faceDown ? strength : `${strength} ${name}`;

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
      onClick={!deployed ? () => moves.selectCard(card.cardID) : undefined}
      tabIndex={0}
      css={css`
        transition-duration: 0.3s;
        transition-property: transform;
        &:hover {
          transform: scale(1.1);
        }
      `}
    >
      {cardDisplay}
    </Box>
  );
};

export default Card;
