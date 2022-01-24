import { Container } from "../components/styles/Container.styled";
import { StyledLink, Warning } from "../components/styles/Warning.styled";

const NotLoggedInPage = () => {
  return (
    <Container width="100%">
      <Warning>
        <h1>Please log in</h1>
        <p>You need to log in to record your mood.</p>
        <StyledLink to="/login">You can log in here</StyledLink>
      </Warning>
    </Container>
  );
};

export default NotLoggedInPage;
