import { CardInfo, TheaterType } from './cards';

export interface GameState {
  // aka 'G', your game's state
  players: Player[];
  secret: SecretInfo;
  playingField: Theater[];
  selectedCardID: number;
}
export interface Player {
  ID: string;
  ready: boolean;
  firstPlayer: boolean;
  score: number;
  cards: CardInfo[];
}
export interface Theater {
  theater: TheaterType;
  deployedCards: Record<string, CardInfo[]>;
}
export interface SecretInfo {
  deck: CardInfo[];
  discardPile: CardInfo[];
}
