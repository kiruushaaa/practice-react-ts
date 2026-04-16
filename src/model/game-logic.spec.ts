import { describe, it, expect } from 'vitest';
import {
  createEmptyBoard,
  getLowestAvailableRow,
  checkWinner,
} from './game-logic';
import { ROWS, COLS } from '../types/game';

describe('Game Logic', () => {
  it('createEmptyBoard should create a board with ROWS x COLS of null', () => {
    const board = createEmptyBoard();
    expect(board.length).toBe(ROWS);
    board.forEach((row) => {
      expect(row.length).toBe(COLS);
      row.forEach((cell) => expect(cell).toBeNull());
    });
  });

  describe('getLowestAvailableRow', () => {
    it('should return the bottom-most empty row', () => {
      const board = createEmptyBoard();
      board[ROWS - 1][0] = 'X';
      board[ROWS - 2][0] = null;
      expect(getLowestAvailableRow(board, 0)).toBe(ROWS - 2);
    });

    it('should return null if the column is full', () => {
      const board = createEmptyBoard();
      for (let r = 0; r < ROWS; r++) {
        board[r][0] = 'X';
      }
      expect(getLowestAvailableRow(board, 0)).toBeNull();
    });
  });

  describe('checkWinner', () => {
    it('should detect horizontal win', () => {
      const board = createEmptyBoard();
      board[ROWS - 1][0] = 'X';
      board[ROWS - 1][1] = 'X';
      board[ROWS - 1][2] = 'X';
      board[ROWS - 1][3] = 'X';
      expect(checkWinner(board)).toBe('X');
    });

    it('should detect vertical win', () => {
      const board = createEmptyBoard();
      board[ROWS - 1][0] = 'O';
      board[ROWS - 2][0] = 'O';
      board[ROWS - 3][0] = 'O';
      board[ROWS - 4][0] = 'O';
      expect(checkWinner(board)).toBe('O');
    });

    it('should detect diagonal win (down-right)', () => {
      const board = createEmptyBoard();
      board[0][0] = 'X';
      board[1][1] = 'X';
      board[2][2] = 'X';
      board[3][3] = 'X';
      expect(checkWinner(board)).toBe('X');
    });

    it('should detect diagonal win (up-right)', () => {
      const board = createEmptyBoard();
      board[ROWS - 1][0] = 'O';
      board[ROWS - 2][1] = 'O';
      board[ROWS - 3][2] = 'O';
      board[ROWS - 4][3] = 'O';
      expect(checkWinner(board)).toBe('O');
    });

    it('should return Draw when board is full and no one wins', () => {
      const board = createEmptyBoard();
      // Filling the board manually with a guaranteed draw pattern
      // X X O O X X
      // O O X X O O
      // X X O O X X
      // O O X X O O
      // X X O O X X
      // O O X X O O
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          board[r][c] = (Math.floor(c / 2) + r) % 2 === 0 ? 'X' : 'O';
        }
      }
      expect(checkWinner(board)).toBe('Draw');
    });

    it('should return null when there is no winner and board is not full', () => {
      const board = createEmptyBoard();
      board[ROWS - 1][0] = 'X';
      expect(checkWinner(board)).toBeNull();
    });
  });
});
