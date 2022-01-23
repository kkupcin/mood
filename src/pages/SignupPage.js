import { useEffect, useState } from "react";
import Parse from "parse";
import { useHistory } from "react-router-dom";
import { Container } from "../components/styles/Container.styled";
import { StyledForm } from "../components/styles/StyledForm.styled";

const SignupPage = (props) => {
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [isEveryFieldEmpty, setIsEveryFieldEmpty] = useState(true);

  let history = useHistory();

  // Check if every field is empty
  useEffect(() => {
    if (
      signupInfo.username !== "" &&
      signupInfo.email !== "" &&
      signupInfo.password !== "" &&
      signupInfo.confirmPassword !== ""
    ) {
      setIsEveryFieldEmpty(false);
    } else {
      setIsEveryFieldEmpty(true);
    }
  }, [signupInfo]);

  useEffect(() => {
    const body = document.querySelector("body");
    body.className = "img3";
  }, []);

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
    setSignupInfo((prevState) => {
      let infoCopy = { ...prevState };
      infoCopy.confirmPassword = e.target.value;
      return infoCopy;
    });

    if (signupInfo.password === e.target.value) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };

  const signupFormSubmitHandler = async (e) => {
    e.preventDefault();

    const usernameValue = signupInfo.username;
    const emailValue = signupInfo.email;
    const passwordValue = signupInfo.password;

    try {
      const newUser = await Parse.User.signUp(usernameValue, passwordValue);

      newUser.setEmail(emailValue);
      newUser.save();

      props.loginHandler(true);
      history.push("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Container left="15%" align="left">
      <div>
        <h1>Sign up to track your mood</h1>
        <StyledForm>
          <div>
            <label>Username</label>
            <input type="text" onChange={usernameInputHandler}></input>
          </div>
          <div>
            <label>Email</label>
            <input type="email" onChange={emailInputHandler}></input>
          </div>
          <div>
            <label>Password</label>
            <input type="password" onChange={passwordInputHandler}></input>
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
            disabled={isEveryFieldEmpty || !passwordIsValid}
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
