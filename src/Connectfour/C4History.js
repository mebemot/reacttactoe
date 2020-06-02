import React, { useState } from "react";
import { whosTurn } from "./C4";
import "./C4History.css";

export function C4History({ history, stepNumber, onClick, colCount }) {
  const [reverse, setReverse] = useState(false);
  const [, ...actualMoves] = history;

  const moves = actualMoves.map((step, index) => {
    const i = index + 1;
    var currentclass;
    if (stepNumber === i) {
      currentclass = "history current";
    } else {
      currentclass = "history";
    }
    return (
      <li key={i}>
        <button className={currentclass} onClick={() => onClick(i)}>
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
