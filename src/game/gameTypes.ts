import { Card, TheaterType } from './cards';

export interface GameState {
  players: Record<string, Player>;
  secret: SecretInfo;
  playingField: Theater[];
  selectedCardID: number;
  ongoingEffects: Record<string, TheaterType>;
  playOrder: string[]; //['0', '1'], needed for turn order change
}
export interface Player {
  ID: string;
  ready: boolean;
  firstPlayer: boolean;
  score: number;
  cards: Card[];
  ongoingEffects: Record<string, TheaterType>;
}
export interface Theater {
  theater: TheaterType;
  isValid: boolean;
  deployedCards: Record<string, Card[]>;
  totalStrength: Record<string, number>;
}
export interface SecretInfo {
  deck: Card[];
  discardPile: Card[];
}
