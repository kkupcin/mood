import "./SignupPage.css";
import img3 from "../img/Group-1.jpg";
import { useState } from "react";

const SignupPage = () => {
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  // TODO
  // check if email/username in database
  // check if password valid
  // add screen if signup successful or error - button to try again if error, redirect if successful
  // add css cues if username too short, email invalid
  // disable button if form not filled
  // clear fields oncec info submitted

  const usernameInputHandler = (e) => {
    setSignupInfo((prevState) => {
      let infoCopy = { ...prevState };
      infoCopy.username = e.target.value;
      return infoCopy;
    });
  };

  const emailInputHandler = (e) => {
    setSignupInfo((prevState) => {
      let infoCopy = { ...prevState };
      infoCopy.email = e.target.value;
      return infoCopy;
    });
  };

  const passwordInputHandler = (e) => {
    setSignupInfo((prevState) => {
      let infoCopy = { ...prevState };
      infoCopy.password = e.target.value;
      return infoCopy;
    });
  };

  const passwordCheckHandler = (e) => {
    if (signupInfo.password === e.target.value) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };

  const body = document.querySelector("body");
  body.style.backgroundImage = `url(${img3})`;
  body.style.backgroundPosition = "right";
  body.style.backgroundAttachment = "fixed";

  // const passwordErrorHandler = () => {

  // }

  const signupFormSubmitHandler = (e) => {
    e.preventDefault();
    if (passwordIsValid === false) {
      // passwordErrorHandler();
      console.log("Password does not match");
      return;
    }
    console.log(signupInfo);
  };

  return (
    <div className="signup-box">
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
          ></input>
        </div>
        <button
          className="signup-form__button"
          onClick={signupFormSubmitHandler}
        >
          Sign me up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
