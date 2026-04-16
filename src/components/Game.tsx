import { useUnit } from 'effector-react';
import { createGameModel } from '../model/game';
import { COLS } from '../types/game';
import './Game.css';

const gameModel = createGameModel();
const { $board, $currentPlayer, $winner, $gameStatus, dropPiece, resetGame } =
  gameModel;

export const Game = () => {
  const [board, currentPlayer, winner, status] = useUnit([
    $board,
    $currentPlayer,
    $winner,
    $gameStatus,
  ]);

  return (
    <div className="game-container">
      <h1>4 in a Row</h1>

      <div className="status-panel">
        {status === 'playing' ? (
          <p>
            Current Player:{' '}
            <span className="player-token">{currentPlayer}</span>
          </p>
        ) : (
          <p className="winner-text">
            {winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`}
          </p>
        )}
      </div>

      <div className="board">
        <div className="pieces-layer">
          {Array.from({ length: COLS }).map((_, colIndex) => (
            <div key={`col-piece-${colIndex}`} className="column">
              {board.map((_row, rowIndex) => (
                <div
                  key={`piece-${rowIndex}-${colIndex}`}
                  className={`slot ${board[rowIndex][colIndex] ? `filled ${board[rowIndex][colIndex]} falling` : ''}`}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="overlay-layer">
          {Array.from({ length: COLS }).map((_, colIndex) => (
            <div key={`col-overlay-${colIndex}`} className="column">
              {board.map((_row, rowIndex) => (
                <div
                  key={`overlay-${rowIndex}-${colIndex}`}
                  className="overlay-slot"
                />
              ))}
            </div>
          ))}
        </div>

        <div className="interaction-layer">
          {Array.from({ length: COLS }).map((_, colIndex) => (
            <div
              key={`col-interact-${colIndex}`}
              className="column"
              onClick={() => dropPiece(colIndex)}
            >
              {board.map((_row, rowIndex) => (
                <div
                  key={`interact-${rowIndex}-${colIndex}`}
                  className="slot-invisible"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <button className="reset-button" onClick={() => resetGame()}>
        Reset Game
      </button>
    </div>
  );
};
