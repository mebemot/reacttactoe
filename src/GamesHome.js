import React from "react";
import styling from "./GamesHome.module.css";
import tictactoe from "./resources/tictactoe.png";
import connectfour from "./resources/connectfour.png";
import { Link } from "react-router-dom";

export default function GamesHome() {
  const NavStyle = {
    color: "black",
  };
  return (
    <div>
      <div className={styling.cards}>
        <Link style={NavStyle} to="/tictactoe">
          <article className={styling.tcard}>
            <header>
              <h2>Tic-Tac-Toe</h2>
            </header>
            <img src={tictactoe} alt="Tic-Tac-Toe"></img>
          </article>
        </Link>
        <Link style={NavStyle} to="/connectfour">
          <article className={styling.ccard}>
            <header>
              <h2>Connect Four</h2>
            </header>
            <img src={connectfour} alt="Connect Four"></img>
          </article>
        </Link>
      </div>
    </div>
  );
}
