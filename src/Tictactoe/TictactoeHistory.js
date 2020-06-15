import React, { useState } from "react";
import { whosTurn } from "./TictactoeGame";
import "./History.css";

export function TictactoeHistory({ history, stepNumber, onClick, colCount }) {
  const [reverse, setReverse] = useState(false);
  const [, ...actualMoves] = history;

  const moves = actualMoves.map((step, index) => {
    const i = index + 1;
    var currentClass;
    if (stepNumber === i) {
      currentClass = "history current";
    } else {
      currentClass = "history";
    }
    return (
      <li key={i}>
        <button className={currentClass} onClick={() => onClick(i)}>
          {whosTurn(index)}({Math.floor(step.moveIndex / colCount) + 1},{" "}
          {(step.moveIndex % colCount) + 1})
        </button>
      </li>
    );
  });
  if (reverse) {
    moves.reverse();
  }

  return (
    <>
      <button className="toggle" onClick={() => setReverse(!reverse)}>
        /\ or \/
      </button>
      <ol reversed={reverse}>{moves}</ol>
    </>
  );
}
