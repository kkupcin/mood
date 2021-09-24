import "./SignupPage.css";
import img3 from "../img/Group-1.jpg";
import { useState } from "react";
import Parse from "parse";

const SignupPage = () => {
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  // TODO
  // add error if user already exists
  // add screen if signup successful or error - button to try again if error, redirect if successful
  // add css cues if username too short, email invalid
  // disable button if form not filled

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
      newUser.setEmail(emailValue)
      newUser.save()
      alert("Success");
    } catch (err) {
      alert(`${err}`);
    }

    setSignupInfo({
      username: "",
      email: "",
      password: "",
    });
    const passwordCheckInput = document.querySelector("#password-check");
    passwordCheckInput.value = "";
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
            value={signupInfo.username}
          ></input>
        </div>
        <div className="signup-form__div">
          <label className="signup-form__div--label">Email</label>
          <input
            className="signup-form__div--input"
            type="email"
            onChange={emailInputHandler}
            value={signupInfo.email}
          ></input>
        </div>
        <div className="signup-form__div">
          <label className="signup-form__div--label">Password</label>
          <input
            className="signup-form__div--input"
            type="password"
            onChange={passwordInputHandler}
            value={signupInfo.password}
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
