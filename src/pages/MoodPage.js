import Parse from "parse";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router";
import { Container } from "../components/styles/Container.styled";
import NotLoggedInPage from "./NotLoggedInPage";
import { Arrow } from "../components/styles/StyledCalendar.styled";
import { StyledMoodContent } from "../components/styles/StyledMoodContent.styled";

const MoodPage = (props) => {
  const body = document.querySelector("body");
  body.className = "img5";

  const [isLoading, setIsLoading] = useState(true);
  const [moodInfo, setMoodInfo] = useState({});
  const [currInfo, setCurrInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { mood, date } = useParams();

  useEffect(() => {
    if (props.isLoggedIn) {
      setIsLoggedIn(true);
      setMood(mood, date);
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }, [props.isLoggedIn]);

  const setBook = async (mood) => {
    const query = new Parse.Query("Book");
    query.equalTo("mood", mood);
    const results = await query.find();

    const randomIndex = Math.floor(Math.random() * (results.length - 1));
    return results[randomIndex];
  };

  const setPlaylist = async (mood) => {
    const query = new Parse.Query("Playlist");
    query.equalTo("mood", mood);
    const results = await query.find();

    const randomIndex = Math.floor(Math.random() * (results.length - 1));
    return results[randomIndex];
  };

  const setMovie = async (mood) => {
    const query = new Parse.Query("Movie");
    query.equalTo("mood", mood);
    const results = await query.find();

    const randomIndex = Math.floor(Math.random() * (results.length - 1));
    return results[randomIndex];
  };

  const setMood = async (mood, date) => {
    try {
      setIsLoading(true);
      const providedDate = new Date(date);
      const Day = new Parse.Object("Day");
      const book = await setBook(mood);
      const movie = await setMovie(mood);
      const playlist = await setPlaylist(mood);

      const dayQuery = new Parse.Query("Day");
      dayQuery.equalTo("user", Parse.User.current());
      let results = await dayQuery.find();

      let day = providedDate.getDate();
      let month = providedDate.getMonth();
      let year = providedDate.getFullYear();

      if (results.length > 0) {
        const foundResult = results.find((result) => {
          let resultDay = result.get("date").getDate();
          let resultMonth = result.get("date").getMonth();
          let resultYear = result.get("date").getFullYear();
          if (
            day === resultDay &&
            month === resultMonth &&
            year === resultYear
          ) {
            return result;
          }
        });
        if (foundResult) {
          foundResult.set("date", providedDate);
          foundResult.set("user", Parse.User.current());
          foundResult.set("mood", mood);
          foundResult.set("book", book);
          foundResult.set("movie", movie);
          foundResult.set("playlist", playlist);

          await foundResult.save();
        } else {
          Day.set("date", providedDate);
          Day.set("user", Parse.User.current());
          Day.set("mood", mood);
          Day.set("book", book);
          Day.set("movie", movie);
          Day.set("playlist", playlist);

          await Day.save();
        }
      }

      setMoodInfo({
        book: book,
        movie: movie,
        playlist: playlist,
      });

      setCurrInfo({
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

  const changeCurrShownHandler = (e) => {
    if (e.target.id === "arrow-forward") {
      switch (currInfo.current) {
        case "book":
          setCurrInfo({
            current: "movie",
            title: moodInfo.movie.get("title"),
            description: moodInfo.movie.get("description"),
            avatar: moodInfo.movie.get("avatar"),
          });
          break;
        case "movie":
          setCurrInfo({
            current: "playlist",
            title: moodInfo.playlist.get("title"),
            description: moodInfo.playlist.get("link"),
            avatar: moodInfo.playlist.get("avatar"),
          });
          break;
        case "playlist":
          setCurrInfo({
            current: "book",
            title: moodInfo.book.get("title"),
            description: moodInfo.book.get("description"),
            avatar: moodInfo.book.get("avatar"),
            author: moodInfo.book.get("author"),
          });
          break;
        default:
          setCurrInfo({
            current: "book",
            title: moodInfo.book.get("title"),
            description: moodInfo.book.get("description"),
            avatar: moodInfo.book.get("avatar"),
            author: moodInfo.book.get("author"),
          });
      }
    } else if (e.target.id === "arrow-back") {
      switch (currInfo.current) {
        case "book":
          setCurrInfo({
            current: "playlist",
            title: moodInfo.playlist.get("title"),
            description: moodInfo.playlist.get("link"),
            avatar: moodInfo.playlist.get("avatar"),
          });
          break;
        case "playlist":
          setCurrInfo({
            current: "movie",
            title: moodInfo.movie.get("title"),
            description: moodInfo.movie.get("description"),
            avatar: moodInfo.movie.get("avatar"),
          });
          break;
        case "movie":
          setCurrInfo({
            current: "book",
            title: moodInfo.book.get("title"),
            description: moodInfo.book.get("description"),
            avatar: moodInfo.book.get("avatar"),
            author: moodInfo.book.get("author"),
          });
          break;
        default:
          setCurrInfo({
            current: "book",
            title: moodInfo.book.get("title"),
            description: moodInfo.book.get("description"),
            avatar: moodInfo.book.get("avatar"),
            author: moodInfo.book.get("author"),
          });
      }
    }
  };

  return (
    <React.Fragment>
      {isLoading && (
        <Container>
          <LoadingSpinner className="mood-page" />
        </Container>
      )}
      {!isLoading && !isLoggedIn && <NotLoggedInPage />}
      {!isLoading && isLoggedIn && (
        <Container left="68px" className="mood-page">
          <h1>{`You are feeling ${mood}`}</h1>
          <StyledMoodContent>
            <Arrow
              position="left"
              id="arrow-back"
              className="fas fa-chevron-left"
              onClick={changeCurrShownHandler}
            ></Arrow>
            <div className="outer-mood-page-carousel">
              <img src={currInfo.avatar} alt={currInfo.title} />
              <div>
                <h3>
                  {currInfo.author
                    ? `${currInfo.title} by ${currInfo.author}`
                    : currInfo.title}
                </h3>
                <p>
                  {currInfo.current === "playlist" ? (
                    <a href={currInfo.description} target="_blank">
                      Go to Spotify &#62;
                    </a>
                  ) : (
                    currInfo.description
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
        </Container>
      )}
    </React.Fragment>
  );
};

export default MoodPage;
