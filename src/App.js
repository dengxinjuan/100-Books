import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import { useEffect, useState } from "react";
import BookApi from "./Api/api";
import jwt from "jsonwebtoken";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  //const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState("");

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = jwt.decode(token);
            // put the token on the Api class so it can use it to call the API.
            BookApi.token = token;
            let currentUser = await BookApi.getTheUser(username);
            setCurrentUser(currentUser);
            //setApplicationIds(new Set(currentUser.applications));

            console.log(currentUser);
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser(null);
          }
        }
        setInfoLoaded(true);
      }

      // set infoLoaded to false while async getCurrentUser runs; once the
      // data is fetched (or even if an error happens!), this will be set back
      // to false to control the spinner.
      setInfoLoaded(false);
      getCurrentUser();
    },
    [token]
  );

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
