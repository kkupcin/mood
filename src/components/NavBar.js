import Parse from "parse";
import {
  NavBarLink,
  NavBarLogo,
  StyledNavBar,
} from "./styles/StyledNavBar.styled";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const NavBar = (props) => {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  // If user logs out, pass that to App.js
  const logOutHandler = async () => {
    await Parse.User.logOut();
    props.isLoggedInHandler(false);
  };

  // Location taken from React-Router-DOM
  let location = useLocation();

  // Using location to hide Hamburger menu when it changes
  useEffect(() => {
    setShowHamburgerMenu(false);
  }, [location]);

  // Hamburger menu button click listener to show or hide child nodes (menu)
  const displayHamburgerMenu = () => {
    setShowHamburgerMenu(!showHamburgerMenu);
  };

  return (
    <StyledNavBar>
      <NavBarLogo to="/" id="logo">
        -Mood-
      </NavBarLogo>
      <div
        className={`hamburger ${showHamburgerMenu ? "active-hamburger" : ""}`}
      >
        <i className="fas fa-bars" onClick={displayHamburgerMenu}></i>
        <div>
          {props.isLoggedIn ? (
            <div>
              <NavBarLink to="/calendar" activeClassName="active">
                Mood Calendar
              </NavBarLink>
              <NavBarLink
                onClick={logOutHandler}
                to="/"
                activeClassName="active"
              >
                Log Out
              </NavBarLink>
            </div>
          ) : (
            <div>
              <NavBarLink to="/login" activeClassName="active">
                Login
              </NavBarLink>
              <NavBarLink to="/signup" activeClassName="active">
                Sign Up
              </NavBarLink>
            </div>
          )}
        </div>
      </div>
    </StyledNavBar>
  );
};

export default NavBar;
