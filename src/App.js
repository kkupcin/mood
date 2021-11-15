import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import MainPage from "./pages/MainPage";
import CalendarPage from "./pages/CalendarPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Parse from "parse";
import { useEffect, useState } from "react";
import MoodPage from "./pages/MoodPage";

// Parse initialization
const PARSE_APPLICATION_ID = process.env.REACT_APP_API_KEY;
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = process.env.REACT_APP_JS_KEY;
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if there is a user already logged in
    if (Parse.User.current()) {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (loginSuccessful) => {
    setIsLoggedIn(loginSuccessful);
  };

  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn} isLoggedInHandler={loginHandler} />
      <Switch>
        <Route path="/login">
          <LoginPage loginHandler={loginHandler} />
        </Route>
        <Route path="/signup">
          <SignupPage loginHandler={loginHandler} />
        </Route>
        <Route path="/calendar">
          {isLoggedIn ? <CalendarPage /> : <Redirect to="/" />}
        </Route>
        <Route path="/mood/:mood/:date">
          <MoodPage isLoggedIn={isLoggedIn} />
        </Route>
        <Route exact path="/">
          <MainPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
