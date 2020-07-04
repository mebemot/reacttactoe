import React from "react";
import styling from "./ConnectfourStatus.module.css";

export function ConnectfourStatus({ winner, nextPlayer, isDraw }) {
  let status;
  let counterDisplayed;
  if (winner) {
    status = "Winner: ";
    counterDisplayed = winner;
  } else if (isDraw) {
    status = "Draw:(";
    counterDisplayed = "noCounter";
  } else {
    status = "Next player: ";
    counterDisplayed = nextPlayer;
  }

  return (
    <div className={styling.statusBox}>
      <div>{status}</div>
      <div className={styling[counterDisplayed]}></div>
    </div>
  );
}
