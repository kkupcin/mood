import { useState, useEffect } from "react";
import Parse from "parse";
import { useHistory } from "react-router-dom";
import { Container } from "../components/styles/Container.styled";
import { StyledForm } from "../components/styles/StyledForm.styled";

const LoginPage = (props) => {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const [isEveryFieldEmpty, setIsEveryFieldEmpty] = useState(true);

  let history = useHistory();

  useEffect(() => {
    if (loginInfo.username !== "" && loginInfo.password !== "") {
      setIsEveryFieldEmpty(false);
    } else {
      setIsEveryFieldEmpty(true);
    }
  }, [loginInfo]);

  useEffect(() => {
    const body = document.querySelector("body");
    body.className = "img4";
  }, []);

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

  const loginFormSubmitHandler = async (e) => {
    e.preventDefault();

    const usernameValue = loginInfo.username;
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
        <button disabled={isEveryFieldEmpty} onClick={loginFormSubmitHandler}>
          Log me in
        </button>
      </StyledForm>
    </Container>
  );
};

export default LoginPage;
