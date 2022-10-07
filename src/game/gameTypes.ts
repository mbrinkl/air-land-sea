import { Card, TheaterType } from './cards';

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
  cards: Card[];
}
export interface Theater {
  theater: TheaterType;
  deployedCards: Record<string, Card[]>;
  totalStrength: Record<string, number>;
}
export interface SecretInfo {
  deck: Card[];
  discardPile: Card[];
}
