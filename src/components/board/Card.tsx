import classnames from 'classnames';
import { CardInfo } from 'game/cards';
import './Card.scss';

interface Props {
  info: CardInfo;
  facedown: boolean;
}

export const Card = ({ info, facedown }: Props) => {
  const { theater, strength } = info;
  const cardClassName = facedown ? 'card--face-down' : `card--${theater}`;
  return <div className={classnames('card', cardClassName)}>{strength}</div>;
};
