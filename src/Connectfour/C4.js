import React, { useState } from "react";
import { C4Board } from "./C4Board";
import { C4Status } from "./C4Status";
import { C4History } from "./C4History";
import "./C4Game.css";
import { checkWinner, rowCount, colCount, dropCounter } from "./connectfour";

const cellCount = rowCount * colCount;

const initHistory = [{ squares: Array(cellCount).fill(null), moveIndex: 0 }];

export default function C4() {
  const [history, setHistory] = useState(initHistory);
  const [stepNumber, setStepNumber] = useState(0);

  const current = history[stepNumber];
  const [winner, winningLine] = checkWinner(current.moveIndex, current.squares);

  return (
    <div className="game">
      <div className="status-box">
        <C4Status
          winner={winner}
          nextPlayer={whosTurn(stepNumber)}
          stepNumber={stepNumber}
          isDraw={stepNumber === rowCount * colCount}
        />
      </div>
      <div className="reset-container">
        <button className="reset" onClick={() => jumpTo(0)}>
          RESET
        </button>
      </div>
      <div className="game-board">
        <C4Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          winningLine={winningLine}
          rowCount={rowCount}
          colCount={colCount}
        />
      </div>
      <div className="game-info">
        <C4History
          history={history}
          stepNumber={stepNumber}
          onClick={(stepNumber) => jumpTo(stepNumber)}
          colCount={colCount}
        />
      </div>
    </div>
  );

  function handleClick(i) {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.squares.slice();
    i = dropCounter(i, squares);
    console.log("i = " + i);
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
  let player = stepNumber % 2 === 0 ? "X" : "O";
  return player;
}
