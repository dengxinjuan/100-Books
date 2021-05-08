import { BrowserRouter, Route, Switch } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import Books from "../components/books/Books";
import Home from "../components/pages/Home";
import Profile from "../components/pages/Profile";
import SingleBook from "../components/books/SingleBook";
import ErrorPage from "../components/common/ErrorPage";
import LoginPage from "../components/auth/LoginPage";
import SignupPage from "../components/auth/SignupPage";
import ProfileForm from "../components/pages/ProfileForm";

function Routes({ login, signup, currentUser }) {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/books" exact>
          <Books />
        </Route>
        <Route path="/books/:id" exact>
          <SingleBook />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/login" exact>
          <LoginPage login={login} />
        </Route>
        <Route path="/signup" exact>
          <SignupPage signup={signup} />
        </Route>
        <Route path="/profileForm" exact>
          <ProfileForm />
        </Route>
        <Route path="*" exact>
          <ErrorPage />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
