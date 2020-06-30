import React from "react";
import styling from "./GamesNav.module.css";
import { Link } from "react-router-dom";

export default function GamesNav() {
  const NavStyle = {
    color: "black",
  };
  return (
    <nav className={styling.nav}>
      <div className={styling.drop}>
        <Link style={NavStyle} to="/">
          <div className={styling.dropButton}>Games</div>
        </Link>
        <div className={styling.dropContent}>
          <Link style={NavStyle} to="/tictactoe">
            <li className={styling.link}>Tictactoe</li>
          </Link>
          <Link style={NavStyle} to="/connectfour">
            <li className={styling.link}>Connectfour</li>
          </Link>
        </div>
      </div>
    </nav>
  );
}
