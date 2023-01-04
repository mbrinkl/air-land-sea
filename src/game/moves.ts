import { Move } from 'boardgame.io';
import { GameState } from './gameTypes';
import {
  CardEffect,
  GetAdjacentTheaters,
  getPointsScored,
  RecalculateTotalStrength,
  SetValidTheaters,
} from './gameUtil';

export const selectCard: Move<GameState> = (
  { G, ctx, events, playerID },
  cardIndex: number,
) => {
  G.selectedCardID = cardIndex;
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
  //if blockade in play and total cards in adj theater >= 3 immediately discard card
  //or if containment in play, discard card
  if (
    ('Blockade' in G.ongoingEffects &&
      GetAdjacentTheaters(G, theaterID).includes(
        G.ongoingEffects['Blockade'],
      ) &&
      G.playingField[theaterID].deployedCards['0'].length +
        G.playingField[theaterID].deployedCards['1'].length >=
        3) ||
    'Containment' in G.ongoingEffects
  ) {
    G.secret.discardPile.push(
      ...G.players[playerID].cards.splice(G.selectedCardID, 1),
    );
  } else {
    G.players[playerID].cards[G.selectedCardID].faceDown = true;
    let arrLength = G.playingField[theaterID].deployedCards[playerID].push(
      ...G.players[playerID].cards.splice(G.selectedCardID, 1),
    );

    //set previous uncovered card to covered
    const coveredCard =
      G.playingField[theaterID].deployedCards[playerID].at(-2);
    if (coveredCard !== undefined) {
      G.playingField[theaterID].deployedCards[playerID][arrLength - 2].covered =
        true;
    }
    RecalculateTotalStrength(G, playerID);
  }
  events.endTurn();
};

//play a card face-up to matching theater
export const deploy: Move<GameState> = (
  { G, ctx, events, playerID },
  theaterID: number,
) => {
  if (G.playingField[theaterID].isValid) {
    //if blockade in play and total cards in adj theater >= 3 immediately discard card
    if (
      'Blockade' in G.ongoingEffects &&
      GetAdjacentTheaters(G, theaterID).includes(
        G.ongoingEffects['Blockade'],
      ) &&
      G.playingField[theaterID].deployedCards['0'].length +
        G.playingField[theaterID].deployedCards['1'].length >=
        3
    ) {
      G.secret.discardPile.push(
        ...G.players[playerID].cards.splice(G.selectedCardID, 1),
      );
    } else {
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
        G.playingField[theaterID].deployedCards[playerID][
          arrLength - 2
        ].covered = true;
      }
      RecalculateTotalStrength(G, playerID);
    }
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
