import { useState, useEffect } from "react";
import Parse from "parse";
import { useHistory } from "react-router-dom";
import { Container } from "../components/styles/Container.styled";
import {
  StyledForm,
  StyledInput,
} from "../components/styles/StyledForm.styled";

const LoginPage = (props) => {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const [isEveryFieldEmpty, setIsEveryFieldEmpty] = useState(true);
  const [isFieldEmpty, setIsFieldEmpty] = useState({
    username: false,
    password: false,
  });

  let history = useHistory();

  // Check if fields are empty on mount
  useEffect(() => {
    if (loginInfo.username !== "" && loginInfo.password !== "") {
      setIsEveryFieldEmpty(false);
    } else {
      setIsEveryFieldEmpty(true);
    }
  }, [loginInfo]);

  // Set background image
  useEffect(() => {
    const body = document.querySelector("body");
    body.className = "img4";
  }, []);

  // Handle inputs and set log in info state
  const usernameInputHandler = (e) => {
    setLoginInfo({ ...loginInfo, username: e.target.value });
    if (e.target.value === "") {
      setIsFieldEmpty({ ...isFieldEmpty, username: true });
    } else {
      setIsFieldEmpty({ ...isFieldEmpty, username: false });
    }
  };

  const passwordInputHandler = (e) => {
    setLoginInfo({ ...loginInfo, password: e.target.value });
    if (e.target.value === "") {
      setIsFieldEmpty({ ...isFieldEmpty, password: true });
    } else {
      setIsFieldEmpty({ ...isFieldEmpty, password: false });
    }
  };

  // Log user in with provided details
  const loginFormSubmitHandler = async (e) => {
    e.preventDefault();

    const usernameValue = loginInfo.username.toLowerCase();
    const passwordValue = loginInfo.password;

    try {
      let token = await Parse.Cloud.run("login", {
        username: usernameValue,
        password: passwordValue,
      });
      await Parse.User.become(token);

      props.loginHandler(true);

      history.push("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Container left="15%" align="left">
      <h1>Log In</h1>
      <StyledForm>
        <div>
          <label>Username</label>
          <StyledInput
            type="text"
            onChange={usernameInputHandler}
            value={loginInfo.username}
            error={isFieldEmpty.username}
          ></StyledInput>
        </div>
        <div>
          <label>Password</label>
          <StyledInput
            type="password"
            onChange={passwordInputHandler}
            value={loginInfo.password}
            error={isFieldEmpty.password}
          ></StyledInput>
        </div>
        <button disabled={isEveryFieldEmpty} onClick={loginFormSubmitHandler}>
          Log me in
        </button>
      </StyledForm>
    </Container>
  );
};

export default LoginPage;
