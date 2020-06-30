import React from "react";
import styling from "./TictactoeSquare.module.css";

export function TictactoeSquare({ player, onClick, winningSquare }) {
  let squareClass = winningSquare
    ? `${styling.square} ${styling.winner}`
    : styling.square;
  return (
    <button aria-label={`${player}`} className={squareClass} onClick={onClick}>
      {player}
    </button>
  );
}
