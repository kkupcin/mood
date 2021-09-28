import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";
import Parse from "parse";

const NavBar = (props) => {
    const logOutHandler = () => {
        Parse.User.logOut()
        props.isLoggedInHandler(false)
    }

  return (
    <div className="navbar">
      <Link to="/" className="navbar__logo">
        -Mood-
      </Link>
      {props.isLoggedIn && (
        <div className="navbar__links">
          <NavLink
            to="/calendar"
            activeClassName="active"
            className="navbar__links--link"
          >
            Mood Calendar
          </NavLink>
          <NavLink
            onClick={logOutHandler}
            to="/"
            activeClassName="active"
            className="navbar__links--link"
          >
            Log Out
          </NavLink>
        </div>
      )}
      {!props.isLoggedIn && (
        <div className="navbar__links">
          <NavLink
            to="/login"
            activeClassName="active"
            className="navbar__links--link"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            activeClassName="active"
            className="navbar__links--link"
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default NavBar;
