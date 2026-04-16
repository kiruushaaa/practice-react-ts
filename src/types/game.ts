export const ROWS = 6;
export const COLS = 7;

export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[][];

export type GameStatus = 'playing' | 'finished';
export type Winner = Player | 'Draw' | null;
