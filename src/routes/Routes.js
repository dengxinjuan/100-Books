import { BrowserRouter, Route, Switch } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import Books from "../components/pages/Books";
import Home from "../components/pages/Home";
import Profile from "../components/pages/Profile";

function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/books" exact>
          <Books />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
