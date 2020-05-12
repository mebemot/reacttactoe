import React, { useState } from "react";
import { whosTurn } from "./Game";
import "./History.css";

export function History({ history, stepNumber, onClick, colCount }) {
  const [reverse, setReverse] = useState(false);
  const [, ...actualMoves] = history;

  const moves = actualMoves.map((step, index) => {
    const i = index + 1;
    var currentclass;
    if (stepNumber === i) {
      currentclass = "historyCurrent";
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
      <button className="history" onClick={() => setReverse(!reverse)}>
        /\ or \/
      </button>
      <ol reversed={reverse}>{moves}</ol>
    </>
  );
}
