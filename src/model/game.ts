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
  type UpdateBoardEvent = { board: Board; player: Player };
  const updateBoard = createEvent<UpdateBoardEvent>();

  sample({
    clock: dropPiece,
    source: { board: $board, player: $currentPlayer, status: $gameStatus },
    filter: ({ status }, col) => {
      return (
        status === 'playing' &&
        getLowestAvailableRow($board.getState(), col) !== null
      );
    },
    fn: ({ board, player }, col) => {
      const row = getLowestAvailableRow(board, col)!;

      const newBoard = board.map((rowArr: CellValue[]) => [...rowArr]);
      newBoard[row][col] = player;
      const result: UpdateBoardEvent = { board: newBoard, player };
      return result;
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
