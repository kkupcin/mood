import Parse from "parse";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router";
import { Container } from "../components/styles/Container.styled";
import NotLoggedInPage from "./NotLoggedInPage";
import { Arrow } from "../components/styles/StyledCalendar.styled";
import { StyledMoodContent } from "../components/styles/StyledMoodContent.styled";

const MoodPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currDayInfo, setCurrDayInfo] = useState({});
  const [currShown, setCurrShown] = useState({});
  // Takes mood and date from the URL
  const { mood, date } = useParams();

  useEffect(() => {
    if (props.isLoggedIn) {
      setDayInfo(mood, date);
    } else {
      setIsLoading(false);
    }
  }, [props.isLoggedIn]);

  // Set background image
  useEffect(() => {
    const body = document.querySelector("body");
    body.className = "img5";
  }, []);

  // Either create a new "Day" entry or adjust the currently existing entry from same day
  const setDayInfo = async (mood, date) => {
    try {
      setIsLoading(true);

      const { book, movie, playlist } = await Parse.Cloud.run("getDayInfo", {
        date: date,
        mood: mood,
      });

      // Set info for later getting details to display
      setCurrDayInfo({ book, movie, playlist });

      // Set first currently shown info
      setCurrShown({
        current: "book",
        title: book.get("title"),
        description: book.get("description"),
        avatar: book.get("avatar"),
        author: book.get("author"),
      });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert(err);
    }
  };

  // Change the currently shown information (loops through currShown)
  const changeCurrShownHandler = (e) => {
    if (e.target.id === "arrow-forward") {
      switch (currShown.current) {
        case "book":
          setCurrShown({
            current: "movie",
            title: currDayInfo.movie.get("title"),
            description: currDayInfo.movie.get("description"),
            avatar: currDayInfo.movie.get("avatar"),
          });
          break;
        case "movie":
          setCurrShown({
            current: "playlist",
            title: currDayInfo.playlist.get("title"),
            description: currDayInfo.playlist.get("link"),
            avatar: currDayInfo.playlist.get("avatar"),
          });
          break;
        case "playlist":
          setCurrShown({
            current: "book",
            title: currDayInfo.book.get("title"),
            description: currDayInfo.book.get("description"),
            avatar: currDayInfo.book.get("avatar"),
            author: currDayInfo.book.get("author"),
          });
          break;
        default:
          setCurrShown({
            current: "book",
            title: currDayInfo.book.get("title"),
            description: currDayInfo.book.get("description"),
            avatar: currDayInfo.book.get("avatar"),
            author: currDayInfo.book.get("author"),
          });
      }
    } else if (e.target.id === "arrow-back") {
      switch (currShown.current) {
        case "book":
          setCurrShown({
            current: "playlist",
            title: currDayInfo.playlist.get("title"),
            description: currDayInfo.playlist.get("link"),
            avatar: currDayInfo.playlist.get("avatar"),
          });
          break;
        case "playlist":
          setCurrShown({
            current: "movie",
            title: currDayInfo.movie.get("title"),
            description: currDayInfo.movie.get("description"),
            avatar: currDayInfo.movie.get("avatar"),
          });
          break;
        case "movie":
          setCurrShown({
            current: "book",
            title: currDayInfo.book.get("title"),
            description: currDayInfo.book.get("description"),
            avatar: currDayInfo.book.get("avatar"),
            author: currDayInfo.book.get("author"),
          });
          break;
        default:
          setCurrShown({
            current: "book",
            title: currDayInfo.book.get("title"),
            description: currDayInfo.book.get("description"),
            avatar: currDayInfo.book.get("avatar"),
            author: currDayInfo.book.get("author"),
          });
      }
    }
  };

  return (
    <Container left="68px" className="mood-page">
      {isLoading && <LoadingSpinner className="mood-page" />}
      {!isLoading && !props.isLoggedIn && <NotLoggedInPage />}
      {!isLoading && props.isLoggedIn && (
        <React.Fragment>
          <h1>{`You are feeling ${mood}`}</h1>
          <StyledMoodContent>
            <Arrow
              position="left"
              id="arrow-back"
              className="fas fa-chevron-left"
              onClick={changeCurrShownHandler}
            ></Arrow>
            <div className="outer-mood-page-carousel">
              <img src={currShown.avatar} alt={currShown.title} />
              <div>
                <h3>
                  {currShown.author
                    ? `${currShown.title} by ${currShown.author}`
                    : currShown.title}
                </h3>
                <p>
                  {currShown.current === "playlist" ? (
                    <a
                      href={currShown.description}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Go to Spotify &#62;
                    </a>
                  ) : (
                    currShown.description
                  )}
                </p>
              </div>
            </div>
            <Arrow
              position="right"
              id="arrow-forward"
              className="fas fa-chevron-right"
              onClick={changeCurrShownHandler}
            ></Arrow>
          </StyledMoodContent>
        </React.Fragment>
      )}
    </Container>
  );
};

export default MoodPage;
