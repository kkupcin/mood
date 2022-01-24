import Parse from "parse/lib/browser/Parse";
import { useEffect } from "react";
import { Container } from "../components/styles/Container.styled";
import {
  StyledLink,
  StyledMainContent,
  StyledPara,
} from "../components/styles/StyledMainContent.styled";
import WarningBox from "../components/WarningBox";

const MainPage = (props) => {
  // Set background image
  useEffect(() => {
    const body = document.querySelector("body");
    body.className = "img1";
  }, []);

  const newDate = new Date();

  // Get date for mood calendar
  const date = `${newDate.getFullYear()}-${
    newDate.getMonth() + 1
  }-${newDate.getDate()}`;

  return (
    <Container align="left" left="10%">
      {Parse.User.current() && Parse.User.current().get("isDemo") && (
        <WarningBox />
      )}
      <h1>How are you feeling today?</h1>
      <StyledMainContent>
        <StyledLink mood="sad" to={`/mood/sad/${date}`}>
          sad
        </StyledLink>
        <StyledLink mood="adventurous" to={`/mood/adventurous/${date}`}>
          adventurous
        </StyledLink>
        <StyledLink mood="excited" to={`/mood/excited/${date}`}>
          excited
        </StyledLink>
        <StyledLink mood="afraid" to={`/mood/afraid/${date}`}>
          afraid
        </StyledLink>
        <StyledLink mood="nostalgic" to={`/mood/nostalgic/${date}`}>
          nostalgic
        </StyledLink>
        <StyledLink mood="happy" to={`/mood/happy/${date}`}>
          happy
        </StyledLink>
        <StyledLink mood="lonely" to={`/mood/lonely/${date}`}>
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
