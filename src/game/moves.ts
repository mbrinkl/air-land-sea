import { Move } from 'boardgame.io';
import { GameState } from './gameTypes';
import { getPointsScored } from './gameUtil';

export const selectCard: Move<GameState> = (G, ctx, cardID: number) => {
  G.selectedCardID = cardID;
  ctx.events?.setStage('place');
};
//play a card face-down to any theater
export const improvise: Move<GameState> = (G, ctx, theaterID: number) => {
  let playerID = Number(ctx.currentPlayer);
  G.players[playerID].cards[G.selectedCardID].faceDown = true;
  G.playingField[theaterID].deployedCards[ctx.currentPlayer].push(
    ...G.players[playerID].cards.splice(G.selectedCardID, 1),
  );
  ctx.events?.endTurn();
};

//play a card face-up to matching theater
export const deploy: Move<GameState> = (G, ctx, theaterID: number) => {
  let playerID = Number(ctx.currentPlayer);
  G.players[playerID].cards[G.selectedCardID].faceDown = false;
  G.playingField[theaterID].deployedCards[ctx.currentPlayer].push(
    ...G.players[playerID].cards.splice(G.selectedCardID, 1),
  );
  ctx.events?.endTurn();
};

//lose battle, opponent gains points based on how many cards you have left
export const withdraw: Move<GameState> = (G, ctx) => {
  let lostPlayer = Number(ctx.currentPlayer);
  G.players[lostPlayer ^ 1].score += getPointsScored(
    G.players[lostPlayer].firstPlayer,
    G.players[lostPlayer].cards.length,
  );
};
