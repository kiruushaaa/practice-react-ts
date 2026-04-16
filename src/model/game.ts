import { createStore, createEvent, sample } from 'effector';
import {
  createEmptyBoard,
  getLowestAvailableRow,
  checkWinner,
} from './game-logic';
import type {
  Board,
  Player,
  GameStatus,
  Winner,
  CellValue,
} from '../types/game';

export const createGameModel = () => {
  const $board = createStore<Board>(createEmptyBoard());
  const $currentPlayer = createStore<Player>('X');
  const $winner = createStore<Winner>(null);
  const $gameStatus = createStore<GameStatus>('playing');

  const dropPiece = createEvent<number>();
  const resetGame = createEvent<void>();
  const updateBoard = createEvent<{ board: Board; player: Player }>();

  sample({
    clock: dropPiece,
    source: { board: $board, player: $currentPlayer, status: $gameStatus },
    filter: ({ status }) => status === 'playing',
    fn: ({ board, player }, col) => {
      const row = getLowestAvailableRow(board, col);
      if (row === null) return null;

      const newBoard = board.map((rowArr: CellValue[]) => [...rowArr]);
      newBoard[row][col] = player;
      return { board: newBoard, player: player };
    },
    target: updateBoard,
  });

  $board.on(updateBoard, (_, { board }) => board);

  sample({
    clock: updateBoard,
    source: $currentPlayer,
    fn: (player) => (player === 'X' ? 'O' : 'X'),
    target: $currentPlayer,
  });

  sample({
    clock: updateBoard,
    source: $board,
    fn: (board) => checkWinner(board),
    target: $winner,
  });

  sample({
    clock: $winner,
    filter: (winner) => winner !== null,
    fn: () => 'finished' as GameStatus,
    target: $gameStatus,
  });

  sample({
    clock: resetGame,
    fn: () => createEmptyBoard(),
    target: $board,
  });

  sample({
    clock: resetGame,
    fn: () => 'X' as Player,
    target: $currentPlayer,
  });

  sample({
    clock: resetGame,
    fn: () => null as Winner,
    target: $winner,
  });

  sample({
    clock: resetGame,
    fn: () => 'playing' as GameStatus,
    target: $gameStatus,
  });

  return {
    $board,
    $currentPlayer,
    $winner,
    $gameStatus,
    dropPiece,
    resetGame,
  };
};
