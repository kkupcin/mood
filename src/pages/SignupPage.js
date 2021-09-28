import "./SignupPage.css";
import img3 from "../img/Group-1.jpg";
import { useState } from "react";
import Parse from "parse";
import { Redirect } from "react-router-dom";

const SignupPage = props => {
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [signupSuccessful, setSignupSuccessful] = useState(false);
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(true);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);

  // TODO
  // add error if user already exists
  // add error screen if signup failed
  // add css cues if username too short, email invalid
  // add css cue that password does not match

  const usernameInputHandler = (e) => {
    setSignupInfo((prevState) => {
      let infoCopy = { ...prevState };
      infoCopy.username = e.target.value;
      return infoCopy;
    });
    if (e.target.value.trim().length > 0) {
      setIsUsernameEmpty(false);
    } else {
      setIsUsernameEmpty(true);
    }
  };

  const emailInputHandler = (e) => {
    setSignupInfo((prevState) => {
      let infoCopy = { ...prevState };
      infoCopy.email = e.target.value;
      return infoCopy;
    });
    if (e.target.value.trim().length > 0) {
      setIsEmailEmpty(false);
    } else {
      setIsEmailEmpty(true);
    }
  };

  const passwordInputHandler = (e) => {
    setSignupInfo((prevState) => {
      let infoCopy = { ...prevState };
      infoCopy.password = e.target.value;
      return infoCopy;
    });
    if (e.target.value.trim().length > 0) {
      setIsPasswordEmpty(false);
    } else {
      setIsPasswordEmpty(true);
    }
  };

  const passwordCheckHandler = (e) => {
    if (signupInfo.password === e.target.value) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };

  const formValidationCheck = () => {
    if (
      isUsernameEmpty === false &&
      isPasswordEmpty === false &&
      isEmailEmpty === false &&
      passwordIsValid === true
    ) {
      return false;
    } else {
      return true;
    }
  };

  const body = document.querySelector("body");
  body.style.backgroundImage = `url(${img3})`;
  body.style.backgroundPosition = "right";
  body.style.backgroundAttachment = "fixed";

  const signupFormSubmitHandler = async (e) => {
    e.preventDefault();
    if (passwordIsValid === false) {
      console.log("Password does not match");
      setSignupInfo({
        username: "",
        email: "",
        password: "",
      });
      const passwordCheckInput = document.querySelector("#password-check");
      passwordCheckInput.value = "";
      return;
    }

    const usernameValue = signupInfo.username;
    const emailValue = signupInfo.email;
    const passwordValue = signupInfo.password;

    try {
      const newUser = await Parse.User.signUp(usernameValue, passwordValue);
      newUser.setEmail(emailValue);
      newUser.save();
      setSignupSuccessful(true);
      props.loginHandler(true)
    } catch (err) {
      alert(err);
      setSignupSuccessful(false);
      props.loginHandler(false)
    }
  };

  return (
    <div className="signup-box">
      {signupSuccessful && <Redirect to="/" />}
      <div>
        <h1 className="signup-title">Sign up to track your mood</h1>
        <form className="signup-form">
          <div className="signup-form__div">
            <label className="signup-form__div--label">Username</label>
            <input
              className="signup-form__div--input"
              type="text"
              onChange={usernameInputHandler}
            ></input>
          </div>
          <div className="signup-form__div">
            <label className="signup-form__div--label">Email</label>
            <input
              className="signup-form__div--input"
              type="email"
              onChange={emailInputHandler}
            ></input>
          </div>
          <div className="signup-form__div">
            <label className="signup-form__div--label">Password</label>
            <input
              className="signup-form__div--input"
              type="password"
              onChange={passwordInputHandler}
            ></input>
          </div>
          <div className="signup-form__div">
            <label className="signup-form__div--label">Confirm password</label>
            <input
              className="signup-form__div--input"
              type="password"
              onChange={passwordCheckHandler}
              id="password-check"
            ></input>
          </div>
          <button
            disabled={formValidationCheck()}
            className="signup-form__button"
            onClick={signupFormSubmitHandler}
          >
            Sign me up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
