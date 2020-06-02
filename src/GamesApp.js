import React from "react";
import "./GamesApp.css";
import GamesHome from "./GamesHome";
import GamesNav from "./GamesNav";
import Tictactoe from "./Tictactoe/Tictactoe";
import C4 from "./Connectfour/C4";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//export const BasketContext = React.createContext({
//  BasketItems: [],
//setBasketItems: (items) => {},
//});

export default function GamesApp() {
  //  const [basketItems, setBasketItems] = useState([]);
  return (
    <Router>
      <div className="App">
        <GamesNav />

        <Switch>
          <Route path="/" exact component={GamesHome} />
          <Route path="/tictactoe" component={Tictactoe} />
          <Route path="/connectfour" component={C4} />
        </Switch>
      </div>
    </Router>
  );
}
