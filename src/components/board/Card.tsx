import classnames from 'classnames';
import { CardInfo } from 'game/cards';
import { useBoardContext } from './Board';
import './Card.scss';

interface Props {
  info: CardInfo;
  facedown: boolean;
}

export const Card = ({ info, facedown }: Props) => {
  const { moves } = useBoardContext();
  const { theater, strength, name } = info;
  const cardClassName = facedown ? 'card--face-down' : `card--${theater}`;
  const cardDisplay = facedown ? 2 : `${strength} ${name}`;

  return (
    <div
      className={classnames('card', cardClassName, 'hvr-grow')}
      onClick={() => moves.selectCard()} // todo: add card num args ; only allow for client hand, not opponent
      tabIndex={0}
    >
      {cardDisplay}
    </div>
  );
};
