import React from "react";
import styling from "./ConnectfourSquare.module.css";

export function ConnectfourSquare({ player, onClick, winningSquare }) {
  let squareClass = winningSquare
    ? `${styling.square} ${styling[player]} ${styling.winner}`
    : `${styling.square} ${styling[player]}`;
  return (
    <button
      aria-label={`${player}`}
      className={squareClass}
      onClick={onClick}
    ></button>
  );
}
