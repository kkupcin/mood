import "./App.css";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import MainPage from "./pages/MainPage";
import CalendarPage from "./pages/CalendarPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/login">
          <p>Login</p>
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/calendar">
          <CalendarPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
