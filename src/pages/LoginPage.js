import "./LoginPage.css";
import img4 from "../img/ben-neale-29w9FiMWSr8-unsplash.jpg";
import { useState } from "react";
import Parse from "parse";

const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  // TODO
  // add successful login and redirect
  // add login error and try again button
  // disable button if form not filled

  const usernameInputHandler = (e) => {
    setLoginInfo((prevState) => {
      let infoCopy = { ...prevState };
      infoCopy.username = e.target.value;
      return infoCopy;
    });
  };

  const passwordInputHandler = (e) => {
    setLoginInfo((prevState) => {
      let infoCopy = { ...prevState };
      infoCopy.password = e.target.value;
      return infoCopy;
    });
  };

  const body = document.querySelector("body");
  body.style.backgroundImage = `url(${img4})`;
  body.style.backgroundPosition = "right";
  body.style.backgroundAttachment = "fixed";

  const loginFormSubmitHandler = async (e) => {
    e.preventDefault();

    const usernameValue = loginInfo.username
    const passwordValue = loginInfo.password

    try {
        const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue)
        alert ('Success')
    } catch(err) {
        alert(err)
    }

    setLoginInfo({
        username: "",
        password: "",
      })
  };

  return (
    <div className="login-box">
      <h1 className="login-title">Log In</h1>
      <form className="login-form">
        <div className="login-form__div">
          <label className="login-form__div--label">Username</label>
          <input
            className="login-form__div--input"
            type="text"
            onChange={usernameInputHandler}
            value={loginInfo.username}
          ></input>
        </div>
        <div className="login-form__div">
          <label className="login-form__div--label">Password</label>
          <input
            className="login-form__div--input"
            type="password"
            onChange={passwordInputHandler}
            value={loginInfo.password}
          ></input>
        </div>
        <button className="login-form__button" onClick={loginFormSubmitHandler}>
          Log me in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
