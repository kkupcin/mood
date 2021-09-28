import "./App.css";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import MainPage from "./pages/MainPage";
import CalendarPage from "./pages/CalendarPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Parse from "parse";
import { useState } from "react";

const PARSE_APPLICATION_ID = process.env.REACT_APP_API_KEY;
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = process.env.REACT_APP_JS_KEY;
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = loginSuccessful => {
    setIsLoggedIn(loginSuccessful)
  } 

  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn} isLoggedInHandler={loginHandler} />
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/login">
          <LoginPage loginHandler={loginHandler}/>
        </Route>
        <Route path="/signup">
          <SignupPage loginHandler={loginHandler}/>
        </Route>
        <Route path="/calendar">
          <CalendarPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
