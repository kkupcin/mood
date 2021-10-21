import "./MainPage.css";
import img1 from "../img/leone-venter-VieM9BdZKFo-unsplash.jpg";
import { Link } from "react-router-dom";
import { Container } from "../components/styles/Container.styled";
import { Title } from "../components/styles/Title.styled";

const MainPage = () => {
  const body = document.querySelector("body");
  body.style.backgroundImage = `url(${img1})`;
  body.style.backgroundPosition = "right";
  body.style.backgroundAttachment = "fixed";

  return (
    <Container align="left" left="10%">
      <Title>How are you feeling today?</Title>
      <ul className="main__list">
        <Link className="main__list--item sad" to="/mood/sad">
          sad
        </Link>
        <Link className="main__list--item adventurous" to="/mood/adventurous">
          adventurous
        </Link>
        <Link className="main__list--item excited" to="/mood/excited">
          excited
        </Link>
        <Link className="main__list--item afraid" to="/mood/afraid">
          afraid
        </Link>
        <Link className="main__list--item nostalgic" to="/mood/nostalgic">
          nostalgic
        </Link>
        <Link className="main__list--item happy" to="/mood/happy">
          happy
        </Link>
        <Link className="main__list--item lonely" to="/mood/lonely">
          lonely
        </Link>
      </ul>
      <p className="main__text">
        Mood is an app to track your mood changes and help you decide on your
        entertainment options - whether you'd like to read a book, watch a movie
        or listen to some music.
      </p>
    </Container>
  );
};

export default MainPage;
