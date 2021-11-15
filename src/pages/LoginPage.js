import { useState } from "react";
import Parse from "parse";
import { Redirect } from "react-router-dom";
import { Container } from "../components/styles/Container.styled";
import { StyledForm } from "../components/styles/StyledForm.styled";

const LoginPage = (props) => {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(true);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);

  // TODO
  // add login error and try again button

  const usernameInputHandler = (e) => {
    setLoginInfo((prevState) => {
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

  const passwordInputHandler = (e) => {
    setLoginInfo((prevState) => {
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

  const formValidationCheck = () => {
    if (isUsernameEmpty === false && isPasswordEmpty === false) {
      return false;
    } else {
      return true;
    }
  };

  const body = document.querySelector("body");
  body.className = "img4";

  const loginFormSubmitHandler = async (e) => {
    e.preventDefault();

    const usernameValue = loginInfo.username;
    const passwordValue = loginInfo.password;

    try {
      await Parse.User.logIn(usernameValue, passwordValue);
      setLoginSuccessful(true);
      props.loginHandler(true);
    } catch (err) {
      alert(err);
      setLoginSuccessful(false);
      props.loginHandler(false);
    }

    setLoginInfo({
      username: "",
      password: "",
    });
  };

  return (
    <Container left="15%" align="left">
      {loginSuccessful && <Redirect to="/" />}
      <h1>Log In</h1>
      <StyledForm>
        <div>
          <label>Username</label>
          <input
            type="text"
            onChange={usernameInputHandler}
            value={loginInfo.username}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            onChange={passwordInputHandler}
            value={loginInfo.password}
          ></input>
        </div>
        <button
          disabled={formValidationCheck()}
          onClick={loginFormSubmitHandler}
        >
          Log me in
        </button>
      </StyledForm>
    </Container>
  );
};

export default LoginPage;
