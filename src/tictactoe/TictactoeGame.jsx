import React, { useState } from "react";
import { TictactoeBoard } from "./TictactoeBoard";
import { TictactoeStatus } from "./TictactoeStatus";
import { TictactoeHistory } from "./TictactoeHistory";
import styling from "./TictactoeGame.module.css";

const initHistory = [{ squares: Array(9).fill(null) }];

export default function TictactoeGame() {
  const ROW_COUNT = 3;
  const COL_COUNT = 3;

  const [history, setHistory] = useState(initHistory);
  const [stepNumber, setStepNumber] = useState(0);

  const current = history[stepNumber];
  const [winner, winningLine] = calculateWinner(current.squares);

  return (
    <div className={styling.game}>
      <div className={styling.statusBox}>
        <TictactoeStatus
          winner={winner}
          nextPlayer={whosTurn(stepNumber)}
          stepNumber={stepNumber}
          isDraw={stepNumber === ROW_COUNT * COL_COUNT}
        />
      </div>
      <div className={styling.resetContainer}>
        <button className={styling.reset} onClick={() => setStepNumber(0)}>
          RESET
        </button>
      </div>
      <div className={styling.gameBoard}>
        <TictactoeBoard
          squares={current.squares}
          onClick={handleClick}
          winningLine={winningLine}
          rowCount={ROW_COUNT}
          colCount={COL_COUNT}
        />
      </div>
      <div className={styling.gameInfo}>
        <TictactoeHistory
          history={history}
          stepNumber={stepNumber}
          onClick={setStepNumber}
          colCount={COL_COUNT}
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
}

/**
 * checks indexs which correspond to the squares array against every possible winning combination
 * if they match
 * @returns {[string, Array<number>]} winner and winningLines
 */
function calculateWinner(squares) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], winningLines[i]];
    }
  }
  return [null, []];
}

/**
 * updates player to who is about to make their move
 * @returns {string} player
 */
export function whosTurn(stepNumber) {
  let player = stepNumber % 2 === 0 ? "X" : "O";
  return player;
}
