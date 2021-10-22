import img3 from "../img/Group-1.jpg";
import { useState } from "react";
import Parse from "parse";
import { Redirect } from "react-router-dom";
import { Container } from "../components/styles/Container.styled";
import { StyledForm } from "../components/styles/StyledForm.styled";

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
    <Container left="15%" align="left">
      {signupSuccessful && <Redirect to="/" />}
      <div>
        <h1>Sign up to track your mood</h1>
        <StyledForm>
          <div>
            <label>Username</label>
            <input
              type="text"
              onChange={usernameInputHandler}
            ></input>
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              onChange={emailInputHandler}
            ></input>
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              onChange={passwordInputHandler}
            ></input>
          </div>
          <div>
            <label>Confirm password</label>
            <input
              type="password"
              onChange={passwordCheckHandler}
              id="password-check"
            ></input>
          </div>
          <button
            disabled={formValidationCheck()}
            onClick={signupFormSubmitHandler}
          >
            Sign me up
          </button>
        </StyledForm>
      </div>
    </Container>
  );
};

export default SignupPage;
