import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import { useEffect, useState } from "react";
import BookApi from "./Api/api";
import jwt from "jsonwebtoken";
import LoadingSpinner from "./components/common/LoadingSpinner";
import UserContext from "./components/auth/UserContext";
import useLocalStorage from "./hooks/useLocalStorage";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "100books-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  //const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            let decode = jwt.decode(token);
            console.log(decode);

            let username = decode.username;

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

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   */
  async function signup(signupData) {
    try {
      let { token } = await BookApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login.
   */
  async function login(loginData) {
    try {
      let { token } = await BookApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  /** handle site-wide logout */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <NavBar logout={logout} />
          <Routes login={login} signup={signup} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
