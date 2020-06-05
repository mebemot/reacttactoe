import React from "react";
import styling from "./C4Square.module.css";

export function C4Square({ player, onClick, winningSquare }) {
  let squareClass = winningSquare
    ? `${styling.square} ${styling[player]} ${styling.winner}`
    : `${styling.square} ${styling[player]}`;
  return (
    <button className={squareClass} onClick={onClick}>
    </button>
  );
}
