import React from "react";
import styling from "./GamesApp.module.css";
import GamesHome from "./GamesHome";
import GamesNav from "./GamesNav";
import ConnectfourGame from "./connectfour/ConnectfourGame";
import TictactoeGame from "./tictactoe/TictactoeGame";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function GamesApp() {
  return (
    <Router>
      <div className={styling.app}>
        <GamesNav />

        <Switch>
          <Route path="/" exact component={GamesHome} />
          <Route path="/tictactoe" component={TictactoeGame} />
          <Route path="/connectfour" component={ConnectfourGame} />
        </Switch>
      </div>
    </Router>
  );
}
