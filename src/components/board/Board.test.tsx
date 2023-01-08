import { render, screen } from '@testing-library/react';
import { BoardProps } from 'boardgame.io/react';
import { GameState } from '../../game/gameTypes';
import { createMockBoardProps } from '../../testUtil';
import Board from './Board';

let boardProps: BoardProps<GameState>;

describe('Board', () => {
  beforeEach(() => {
    boardProps = createMockBoardProps();
  });

  describe('invite player button', () => {
    it('should show invite player button in online game if 2nd player has not connected', () => {
      boardProps.matchData![0].isConnected = true;
      render(<Board {...boardProps} />);

      const invitePlayerButton = screen.queryByText('+ Invite a Player');

      expect(invitePlayerButton).toBeInTheDocument();
    });

    it('should hide invite player button in online game if 2nd player has connected', () => {
      boardProps.matchData![0].isConnected = true;
      boardProps.matchData![1].isConnected = true;
      render(<Board {...boardProps} />);

      const invitePlayerButton = screen.queryByText('+ Invite a Player');

      expect(invitePlayerButton).not.toBeInTheDocument();
    });

    it('should hide invite player button in online game if 2nd player has connected and disconnected', () => {
      boardProps.matchData![0].isConnected = true;
      boardProps.matchData![1].isConnected = false;
      render(<Board {...boardProps} />);

      const invitePlayerButton = screen.queryByText('+ Invite a Player');

      expect(invitePlayerButton).not.toBeInTheDocument();
    });
  });
});
