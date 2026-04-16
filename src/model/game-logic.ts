import { ROWS, COLS } from '../types/game';
import type { Board, Player, Winner } from '../types/game';

export const createEmptyBoard = (): Board =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(null));

export const getLowestAvailableRow = (
  board: Board,
  col: number,
): number | null => {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === null) {
      return row;
    }
  }
  return null;
};

export const checkWinner = (board: Board): Winner => {
  // Horizontal
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      if (
        board[r][c] &&
        board[r][c] === board[r][c + 1] &&
        board[r][c] === board[r][c + 2] &&
        board[r][c] === board[r][c + 3]
      ) {
        return board[r][c] as Player;
      }
    }
  }

  // Vertical
  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 0; c < COLS; c++) {
      if (
        board[r][c] &&
        board[r][c] === board[r + 1][c] &&
        board[r][c] === board[r + 2][c] &&
        board[r][c] === board[r + 3][c]
      ) {
        return board[r][c] as Player;
      }
    }
  }

  // Diagonal \
  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      if (
        board[r][c] &&
        board[r][c] === board[r + 1][c + 1] &&
        board[r][c] === board[r + 2][c + 2] &&
        board[r][c] === board[r + 3][c + 3]
      ) {
        return board[r][c] as Player;
      }
    }
  }

  // Diagonal /
  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      if (
        board[r][c] &&
        board[r][c] === board[r - 1][c + 1] &&
        board[r][c] === board[r - 2][c + 2] &&
        board[r][c] === board[r - 3][c + 3]
      ) {
        return board[r][c] as Player;
      }
    }
  }

  // Draw check
  const isFull = board.every((row) => row.every((cell) => cell !== null));
  if (isFull) return 'Draw';

  return null;
};
