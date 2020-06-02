import React, { useState } from "react";
import { Board } from "./Board";
import { Status } from "./Status";
import { History } from "./History";
import "./Game.css";

const initHistory = [{ squares: Array(9).fill(null) }];

export default function Tictactoe() {
  const rowCount = 3;
  const colCount = 3;

  const [history, setHistory] = useState(initHistory);
  const [stepNumber, setStepNumber] = useState(0);

  const current = history[stepNumber];
  const [winner, winningLine] = calculateWinner(current.squares);

  return (
    <div className="game">
      <div className="status-box">
        <Status
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
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          winningLine={winningLine}
          rowCount={rowCount}
          colCount={colCount}
        />
      </div>
      <div className="game-info">
        <History
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
    const [winner] = calculateWinner(squares);
    if (winner || squares[i]) {
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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]];
    }
  }
  return [null, []];
}

export function whosTurn(stepNumber) {
  let player = stepNumber % 2 === 0 ? "X" : "O";
  return player;
}
