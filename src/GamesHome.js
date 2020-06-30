import React from "react";
import styling from "./GamesHome.module.css";

export default function GamesHome() {
  return (
    <div>
      <div className={styling.cards}>
        <article className={styling.card}>
          <header>
            <h2>Ticatactoe</h2>
          </header>

          <div>
            <p>letter game</p>
          </div>
        </article>
        <article className={styling.card}>
          <header>
            <h2>Connectfour</h2>
          </header>

          <div>
            <p>counter game</p>
          </div>
        </article>
      </div>
    </div>
  );
}
