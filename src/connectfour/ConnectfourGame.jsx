import React, { useState } from "react";
import { ConnectfourBoard } from "./ConnectfourBoard";
import { ConnectfourStatus } from "./ConnectfourStatus";
import { ConnectfourHistory } from "./ConnectfourHistory";
import styling from "./ConnectfourGame.module.css";
import {
  checkWinner,
  ROW_COUNT,
  COL_COUNT,
  dropCounter,
} from "./ConnectfourRules";

const CELL_COUNT = ROW_COUNT * COL_COUNT;

const initHistory = [{ squares: Array(CELL_COUNT).fill(null), moveIndex: 0 }];

export default function ConnectfourGame() {
  const [history, setHistory] = useState(initHistory);
  const [stepNumber, setStepNumber] = useState(0);

  const current = history[stepNumber];
  const [winner, winningLine] = checkWinner(
    current.moveIndex,
    current.squares,
    whosTurn(stepNumber - 1) // whosTurn(stepNumber) determines who plays next so need to adjust
  );
  return (
    <div className={styling.game}>
      <div className={styling.statusBox}>
        <ConnectfourStatus
          winner={winner}
          nextPlayer={whosTurn(stepNumber)}
          stepNumber={stepNumber}
          isDraw={stepNumber === ROW_COUNT * COL_COUNT}
        />
      </div>
      <div className={styling.resetContainer}>
        <button
          aria-label="Reset game"
          className={styling.reset}
          onClick={() => setStepNumber(0)}
        >
          RESET
        </button>
      </div>
      <div className={styling.gameBoard}>
        <ConnectfourBoard
          squares={current.squares}
          onClick={handleClick}
          winningLine={winningLine}
          rowCount={ROW_COUNT}
          colCount={COL_COUNT}
        />
      </div>
       
      <div className={styling.gameInfo}>
        <ConnectfourHistory
          history={history}
          stepNumber={stepNumber}
          onClick={setStepNumber}
          colCount={COL_COUNT}
          player={whosTurn(stepNumber - 1)}
        />
      </div>
    </div>
  );

  /**
   * Determines what happens after each click, if a playable move the game updates accordingly
   * @returns {void}
   */
  function handleClick(i) {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.squares.slice();
    i = dropCounter(i, squares);
    if (winner || i === false) {
      return;
    }

    squares[i] = whosTurn(stepNumber);

    //new version of history created for the move just taken
    const newHistory = currentHistory.concat([
      {
        squares: squares,
        moveIndex: i,
      },
    ]);
    setHistory(newHistory);
    setStepNumber(currentHistory.length);
  }
}

/**
 * updates player to who is about to make their move
 * @returns {string} player
 */
export function whosTurn(stepNumber) {
  let player = stepNumber % 2 === 0 ? "red" : "yellow";
  return player;
}
