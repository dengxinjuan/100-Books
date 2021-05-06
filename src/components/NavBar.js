import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "./common/Button";
import "./Navbar.css";
import UserContext from "./auth/UserContext";

function NavBar({ logout }) {
  const [click, setClick] = useState(false); // menu click setup
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const { currentUser } = useContext(UserContext);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  /*close the menu and logout*/
  function closeAndLogout() {
    closeMobileMenu();
    logout();
  }

  /* the show button only works once */
  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  /*when not user in the nav view*/
  function NoUserNav() {
    return (
      <li className="nav-item">
        <Link
          to="/login"
          className="nav-links-mobile"
          onClick={closeMobileMenu}
        >
          LOG IN
        </Link>
      </li>
    );
  }

  /**when user in the nav */

  function userNav() {
    return (
      <li className="nav-item">
        <Link to="/login" className="nav-links-mobile" onClick={closeAndLogout}>
          LOG OUT
        </Link>
      </li>
    );
  }

  return (
    <div>
      <div className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <i class="fas fa-book"></i>100Books
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/books" className="nav-links" onClick={closeMobileMenu}>
                Books
              </Link>
            </li>
            {/** here hide the profile link if no user logged in. */}
            {currentUser && (
              <li className="nav-item">
                <Link
                  to="/profile"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
              </li>
            )}
            {/** this is the mobile button that show log in/log out */}
            {currentUser ? userNav() : NoUserNav()}
          </ul>

          {/**this is the large button in the full page  */}
          {button && !currentUser && (
            <Button buttonStyle="btn--outline">
              <Link to="login" className="nav-links">
                LOG IN
              </Link>
            </Button>
          )}

          {/**this is the large button and when user need to logout */}

          {button && currentUser && (
            <Button buttonStyle="btn--outline">
              <Link to="login" className="nav-links" onClick={logout}>
                LOG OUT
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
