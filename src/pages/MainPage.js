import img1 from "../img/leone-venter-VieM9BdZKFo-unsplash.jpg";
import { Container } from "../components/styles/Container.styled";
import { StyledLink, StyledMainContent, StyledPara } from "../components/styles/StyledMainContent.styled";

const MainPage = () => {
  const body = document.querySelector("body");
  body.style.backgroundImage = `url(${img1})`;
  body.style.backgroundPosition = "right";
  body.style.backgroundAttachment = "fixed";

  return (
    <Container align="left" left="10%">
      <h1>How are you feeling today?</h1>
      <StyledMainContent>
        <StyledLink mood="sad" to="/mood/sad">
          sad
        </StyledLink>
        <StyledLink mood="adventurous" to="/mood/adventurous">
          adventurous
        </StyledLink>
        <StyledLink mood="excited" to="/mood/excited">
          excited
        </StyledLink>
        <StyledLink mood="afraid" to="/mood/afraid">
          afraid
        </StyledLink>
        <StyledLink mood="nostalgic" to="/mood/nostalgic">
          nostalgic
        </StyledLink>
        <StyledLink mood="happy" to="/mood/happy">
          happy
        </StyledLink>
        <StyledLink mood="lonely" to="/mood/lonely">
          lonely
        </StyledLink>
      </StyledMainContent>
      <StyledPara>
        Mood is an app to track your mood changes and help you decide on your
        entertainment options - whether you'd like to read a book, watch a movie
        or listen to some music.
      </StyledPara>
    </Container>
  );
};

export default MainPage;
