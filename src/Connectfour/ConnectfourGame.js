import React, { useState } from "react";
import { ConnectfourBoard } from "./ConnectfourBoard";
import { ConnectfourStatus } from "./ConnnectfourStatus";
import { ConnectfourHistory } from "./ConnectfourHistory";
import styling from "./ConnectfourGame.module.css";
import {
  checkWinner,
  rowCount,
  colCount,
  dropCounter,
} from "./ConnectfourRules";

const cellCount = rowCount * colCount;

const initHistory = [{ squares: Array(cellCount).fill(null), moveIndex: 0 }];

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
          isDraw={stepNumber === rowCount * colCount}
        />
      </div>
      <div className={styling.resetContainer}>
        <button aria-label="Reset game" className={styling.reset} onClick={() => jumpTo(0)}>
          RESET
        </button>
      </div>
      <div className={styling.gameBoard}>
        <ConnectfourBoard
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          winningLine={winningLine}
          rowCount={rowCount}
          colCount={colCount}
        />
      </div>
       
      <div className={styling.gameInfo}>
        <ConnectfourHistory
          history={history}
          stepNumber={stepNumber}
          onClick={(stepNumber) => jumpTo(stepNumber)}
          colCount={colCount}
          player={whosTurn(stepNumber-1)}
        />
      </div>
    </div>
  );

  function handleClick(i) {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.squares.slice();
    i = dropCounter(i, squares);
    if (winner || i === false) {
      return;
    }

    squares[i] = whosTurn(stepNumber);

    const newHistory = currentHistory.concat([
      {
        squares: squares,
        moveIndex: i,
      },
    ]);
    setHistory(newHistory);
    setStepNumber(currentHistory.length);
  }

  function jumpTo(step) {
    setStepNumber(step);
  }
}

export function whosTurn(stepNumber) {
  let player = stepNumber % 2 === 0 ? "red" : "yellow";
  return player;
}
