import React from "react";
import "./GamesApp.css";

export default function GamesHome() {
  return (
    <div>
      <div className="cards">
        <article className="card">
          <header>
            <h2>Ticatactoe</h2>
          </header>
          <img src="" alt="tictactoe" />
          <div>
            <p>letter game</p>
          </div>
        </article>
        <article className="card">
          <header>
            <h2>Connectfour</h2>
          </header>
          <img src="" alt="connectfour" />
          <div>
            <p>counter game</p>
          </div>
        </article>
      </div>
    </div>
  );
}

