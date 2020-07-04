import React from "react";
import styling from "./GamesHome.module.css";
import tictactoe from "./resources/tictactoe.png";
import connectfour from "./resources/connectfour.png";
import GameLink from "./GameLink";

export default function GamesHome() {
  return (
    <div className={styling.cards}>
      <GameLink
        address="/tictactoe"
        styling={styling.card1}
        image={tictactoe}
        gameName="Tic-Tac-Toe"
      />
      <GameLink
        address="/connectfour"
        styling={styling.card2}
        image={connectfour}
        gameName="Connect Four"
      />
    </div>
  );
}
