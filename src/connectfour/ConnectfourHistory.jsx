import React, { useState } from "react";
import { whosTurn } from "./ConnectfourGame";
import styling from "./ConnectfourHistory.module.css";

export function ConnectfourHistory({ history, stepNumber, onClick, colCount }) {
  const [reverse, setReverse] = useState(false);
  const [, ...actualMoves] = history;
  let toggle = "toggle";

  const moves = actualMoves.map((step, index) => {
    const i = index + 1;
    let currentClass;
    if (stepNumber === i) {
      currentClass = `${styling.history} ${styling.current}`;
    } else {
      currentClass = `${styling.history}`;
    }
    return (
      //button displaying (row, col) for the move made along with players counter
      <li key={i}>
        <button
          className={currentClass}
          aria-label={`${whosTurn(index)} (
          ${Math.floor(step.moveIndex / colCount) + 1},
          ${(step.moveIndex % colCount) + 1})`}
          onClick={() => onClick(i)}
        >
          <div className={styling[whosTurn(index)]}></div>(
          {Math.floor(step.moveIndex / colCount) + 1},
          {(step.moveIndex % colCount) + 1})
        </button>
      </li>
    );
  });
  if (reverse) {
    moves.reverse();
    toggle = "toggleReversed";
  }

  return (
    <>
      <button
        aria-label="Toggle move list order"
        className={styling[toggle]}
        onClick={() => setReverse(!reverse)}
      >
        /\ or \/
      </button>
      <ol reversed={reverse} className={styling.historyList}>
        {moves}
      </ol>
    </>
  );
}
