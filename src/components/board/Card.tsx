import classnames from 'classnames';
import { CardInfo } from 'game/cards';
import { useBoardContext } from './Board';
import './Card.scss';

interface Props {
  info: CardInfo;
  deployed?: 'self' | 'opponent';
}

export const Card = ({ info, deployed }: Props) => {
  const { G, moves, playerID } = useBoardContext();
  const { theater, strength, name, faceDown } = info;
  let cardClassName = faceDown ? 'card--face-down' : `card--${theater}`;
  if (deployed != null) {
    cardClassName += ` card--deployed-${deployed}`;
  }
  const cardDisplay = faceDown ? strength : `${strength} ${name}`;

  function getCardId(): number {
    return G.players[Number(playerID)].cards.findIndex(
      (c) => c.theater === theater && c.name === name,
    );
  }

  return (
    <div
      className={classnames('card', cardClassName)}
      onClick={!deployed ? () => moves.selectCard(getCardId()) : undefined} // todo: add card num args ; only allow for client hand, not opponent
      tabIndex={0}
    >
      {cardDisplay}
    </div>
  );
};
