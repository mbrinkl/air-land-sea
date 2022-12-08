import { Move } from 'boardgame.io';
import { GameState } from './gameTypes';
import {
  CalculateCardStrength,
  CardEffect,
  getPointsScored,
  SetValidTheaters,
} from './gameUtil';

export const selectCard: Move<GameState> = (
  { G, ctx, events, playerID },
  cardID: number,
) => {
  G.selectedCardID = cardID;
  SetValidTheaters(
    G,
    playerID,
    G.players[ctx.currentPlayer].cards[G.selectedCardID],
  );
  events.setStage('place');
};
//play a card face-down to any theater
export const improvise: Move<GameState> = (
  { G, ctx, events, playerID },
  theaterID: number,
) => {
  //TODO: if blockade, immediately discard card
  G.players[playerID].cards[G.selectedCardID].faceDown = true;
  let arrLength = G.playingField[theaterID].deployedCards[
    ctx.currentPlayer
  ].push(...G.players[playerID].cards.splice(G.selectedCardID, 1));

  //set previous uncovered card to covered
  const coveredCard =
    G.playingField[theaterID].deployedCards[ctx.currentPlayer].at(-2);
  if (coveredCard !== undefined) {
    G.playingField[theaterID].deployedCards[ctx.currentPlayer][
      arrLength - 2
    ].covered = true;
  }

  //set card strength
  G.playingField[theaterID].deployedCards[ctx.currentPlayer][
    arrLength - 1
  ].strength = CalculateCardStrength(
    G,
    playerID,
    G.playingField[theaterID].deployedCards[ctx.currentPlayer][arrLength - 1],
  );

  //update total strength for theater
  G.playingField[theaterID].totalStrength[ctx.currentPlayer] +=
    G.playingField[theaterID].deployedCards[ctx.currentPlayer][
      arrLength - 1
    ].strength;

  events.endTurn();
};

//play a card face-up to matching theater
export const deploy: Move<GameState> = (
  { G, ctx, events, playerID },
  theaterID: number,
) => {
  if (G.playingField[theaterID].isValid) {
    let { cardID } = G.players[playerID].cards[G.selectedCardID];
    G.players[playerID].cards[G.selectedCardID].faceDown = false;
    const arrLength = G.playingField[theaterID].deployedCards[
      ctx.currentPlayer
    ].push(...G.players[playerID].cards.splice(G.selectedCardID, 1));

    CardEffect(G, playerID, cardID, theaterID);

    //set previous uncovered card to covered
    const coveredCard =
      G.playingField[theaterID].deployedCards[playerID].at(-2);
    if (coveredCard !== undefined) {
      G.playingField[theaterID].deployedCards[playerID][arrLength - 2].covered =
        true;
    }

    //set card strength
    G.playingField[theaterID].deployedCards[playerID][arrLength - 1].strength =
      CalculateCardStrength(
        G,
        playerID,
        G.playingField[theaterID].deployedCards[ctx.currentPlayer][
          arrLength - 1
        ],
      );

    //update total strength for theater
    G.playingField[theaterID].totalStrength[ctx.currentPlayer] +=
      G.playingField[theaterID].deployedCards[ctx.currentPlayer][
        arrLength - 1
      ].strength;

    events.endTurn();
  } else {
    //keep letting them try til they click the right theater
    events.setStage('place');
  }
};

//lose battle, opponent gains points based on how many cards you have left
export const withdraw: Move<GameState> = ({ G, ctx, events }) => {
  let lostPlayer = Number(ctx.currentPlayer);
  G.players[lostPlayer ^ 1].score += getPointsScored(
    G.players[lostPlayer].firstPlayer,
    G.players[lostPlayer].cards.length,
  );

  if (G.players[lostPlayer ^ 1].score >= 12) {
    ctx.gameover;
  } else {
    //probably don't need the firstPlayer variable now that I need playOrder, oh well leaving for now
    G.players[lostPlayer ^ 1].firstPlayer = G.players[lostPlayer].firstPlayer;
    G.players[lostPlayer].firstPlayer = !G.players[lostPlayer].firstPlayer;
    [G.playOrder[0], G.playOrder[1]] = [G.playOrder[1], G.playOrder[0]];

    events.setPhase('shuffleAndDeal');
  }
};
