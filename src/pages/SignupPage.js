import { useEffect, useState } from "react";
import Parse from "parse";
import { useHistory } from "react-router-dom";
import { Container } from "../components/styles/Container.styled";
import {
  StyledForm,
  StyledInput,
} from "../components/styles/StyledForm.styled";

const SignupPage = (props) => {
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [isEveryFieldEmpty, setIsEveryFieldEmpty] = useState(true);
  const [isFieldEmpty, setIsFieldEmpty] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

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

  // Set background image
  useEffect(() => {
    const body = document.querySelector("body");
    body.className = "img3";
  }, []);

  // Handle input and set state for signing up
  const usernameInputHandler = (e) => {
    setSignupInfo({ ...signupInfo, username: e.target.value.toLowerCase() });
    if (e.target.value === "") {
      setIsFieldEmpty({ ...isFieldEmpty, username: true });
    } else {
      setIsFieldEmpty({ ...isFieldEmpty, username: false });
    }
  };

  const emailInputHandler = (e) => {
    setSignupInfo({ ...signupInfo, email: e.target.value });
    if (e.target.value === "") {
      setIsFieldEmpty({ ...isFieldEmpty, email: true });
    } else {
      setIsFieldEmpty({ ...isFieldEmpty, email: false });
    }
  };

  const passwordInputHandler = (e) => {
    setSignupInfo({ ...signupInfo, password: e.target.value });
    if (e.target.value === "") {
      setIsFieldEmpty({ ...isFieldEmpty, password: true });
    } else {
      setIsFieldEmpty({ ...isFieldEmpty, password: false });
    }
  };

  // Check if entered passwords match
  const passwordCheckHandler = (e) => {
    setSignupInfo({ ...signupInfo, confirmPassword: e.target.value });
    if (e.target.value === "") {
      setIsFieldEmpty({ ...isFieldEmpty, confirmPassword: true });
    } else {
      setIsFieldEmpty({ ...isFieldEmpty, confirmPassword: false });
    }

    if (signupInfo.password === e.target.value) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };

  // Creates new user account
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
            <StyledInput
              type="text"
              onChange={usernameInputHandler}
              value={signupInfo.username}
              error={isFieldEmpty.username}
            ></StyledInput>
          </div>
          <div>
            <label>Email</label>
            <StyledInput
              type="email"
              onChange={emailInputHandler}
              value={signupInfo.email}
              error={isFieldEmpty.email}
            ></StyledInput>
          </div>
          <div>
            <label>Password</label>
            <StyledInput
              type="password"
              onChange={passwordInputHandler}
              value={signupInfo.password}
              error={isFieldEmpty.password}
            ></StyledInput>
          </div>
          <div>
            <label>Confirm password</label>
            <StyledInput
              type="password"
              onChange={passwordCheckHandler}
              value={signupInfo.confirmPassword}
              error={isFieldEmpty.confirmPassword}
              id="password-check"
            ></StyledInput>
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
