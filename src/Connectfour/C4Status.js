import React from "react";
import "./C4Status.css"

export function C4Status({ winner, nextPlayer, isDraw }) {
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (isDraw) {
    status = "Draw:(";
  } else {
    status = "Next player: " + nextPlayer;
  }
  return <div className="status">{status}</div>;
}
