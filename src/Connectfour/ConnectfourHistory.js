import React, { useState } from "react";
import { whosTurn } from "./ConnectfourGame";
import styling from "./C4History.module.css";

export function ConnectfourHistory({ history, stepNumber, onClick, colCount }) {
  const [reverse, setReverse] = useState(false);
  const [, ...actualMoves] = history;
  let toggle = "toggle";

  const moves = actualMoves.map((step, index) => {
    const i = index + 1;
    var currentclass;
    if (stepNumber === i) {
      currentclass = `${styling.history} ${styling.current}`;
    } else {
      currentclass = styling.history;
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
    toggle = "togglereversed";
  }

  return (
    <>
      <button className={styling[toggle]} onClick={() => setReverse(!reverse)}>
        /\ or \/
      </button>
      <ul reversed={reverse}>{moves}</ul>
    </>
  );
}
