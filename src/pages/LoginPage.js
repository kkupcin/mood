import "./LoginPage.css";
import img4 from "../img/ben-neale-29w9FiMWSr8-unsplash.jpg";
import { useState } from "react";
import Parse from "parse";
import { Redirect } from "react-router-dom";

const LoginPage = props => {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const [loginSuccessful, setLoginSuccessful] = useState(false)
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(true)
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true)

  // TODO
  // add login error and try again button

  const usernameInputHandler = (e) => {
    setLoginInfo((prevState) => {
      let infoCopy = { ...prevState };
      infoCopy.username = e.target.value;
      return infoCopy;
    });
    if (e.target.value.trim().length > 0) {
        setIsUsernameEmpty(false)
    } else {
        setIsUsernameEmpty(true)
    }
  };

  const passwordInputHandler = (e) => {
    setLoginInfo((prevState) => {
      let infoCopy = { ...prevState };
      infoCopy.password = e.target.value;
      return infoCopy;
    });
    if (e.target.value.trim().length > 0) {
        setIsPasswordEmpty(false)
    } else {
        setIsPasswordEmpty(true)
    }
  };

  const formValidationCheck = () => {
      if (isUsernameEmpty === false && isPasswordEmpty === false) {
          return false
      } else {
          return true
      }
  }

  const body = document.querySelector("body");
  body.style.backgroundImage = `url(${img4})`;
  body.style.backgroundPosition = "right";
  body.style.backgroundAttachment = "fixed";

  const loginFormSubmitHandler = async (e) => {
    e.preventDefault();

    const usernameValue = loginInfo.username;
    const passwordValue = loginInfo.password;

    try {
      await Parse.User.logIn(usernameValue, passwordValue);
      setLoginSuccessful(true)
      props.loginHandler(true)
    } catch (err) {
      alert(err);
      setLoginSuccessful(false)
      props.loginHandler(false)
    }

    setLoginInfo({
      username: "",
      password: "",
    });
  };

  return (
    <div className="login-box">
        {loginSuccessful && <Redirect to='/' />}
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
        <button disabled={formValidationCheck()} className="login-form__button" onClick={loginFormSubmitHandler}>
          Log me in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
