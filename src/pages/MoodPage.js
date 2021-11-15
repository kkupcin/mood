import Parse from "parse";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router";
import { Container } from "../components/styles/Container.styled";
import NotLoggedInPage from "./NotLoggedInPage";
import { Arrow } from "../components/styles/StyledCalendar.styled";
import { StyledMoodContent } from "../components/styles/StyledMoodContent.styled";

const MoodPage = (props) => {
  // Add background image class for styling
  const body = document.querySelector("body");
  body.className = "img5";

  const [isLoading, setIsLoading] = useState(true);
  const [currDayInfo, setCurrDayInfo] = useState({});
  const [currShown, setCurrShown] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Takes mood and date from the URL
  const { mood, date } = useParams();

  useEffect(() => {
    if (props.isLoggedIn) {
      setIsLoggedIn(true);
      setDayInfo(mood, date);
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }, [props.isLoggedIn]);

  // Assigns random book from Parse based on mood
  const setRandomBook = async (mood) => {
    const query = new Parse.Query("Book");
    query.equalTo("mood", mood);
    const results = await query.find();

    const randomIndex = Math.floor(Math.random() * (results.length - 1));
    return results[randomIndex];
  };

  // Assigns random playlist from Parse based on mood
  const setRandomPlaylist = async (mood) => {
    const query = new Parse.Query("Playlist");
    query.equalTo("mood", mood);
    const results = await query.find();

    const randomIndex = Math.floor(Math.random() * (results.length - 1));
    return results[randomIndex];
  };

  // Assigns random movie from Parse based on mood
  const setRandomMovie = async (mood) => {
    const query = new Parse.Query("Movie");
    query.equalTo("mood", mood);
    const results = await query.find();

    const randomIndex = Math.floor(Math.random() * (results.length - 1));
    return results[randomIndex];
  };

  // Either creates a new "Day" entry or adjusts the currently existing entry from same day
  const setDayInfo = async (mood, date) => {
    try {
      setIsLoading(true);
      const providedDate = new Date(date);
      const Day = new Parse.Object("Day");

      // Assigns random data from Parse
      const book = await setRandomBook(mood);
      const movie = await setRandomMovie(mood);
      const playlist = await setRandomPlaylist(mood);

      // Looks if Parse object for for same day already exists
      const dayQuery = new Parse.Query("Day");
      dayQuery.equalTo("user", Parse.User.current());
      let results = await dayQuery.find();

      // Gets date for search
      let day = providedDate.getDate();
      let month = providedDate.getMonth();
      let year = providedDate.getFullYear();

      // Checks if dates match with any found entries
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

        // If entry exists, changes found values to newly generated values
        if (foundResult) {
          foundResult.set("date", providedDate);
          foundResult.set("user", Parse.User.current());
          foundResult.set("mood", mood);
          foundResult.set("book", book);
          foundResult.set("movie", movie);
          foundResult.set("playlist", playlist);

          await foundResult.save();
        } else {
          // If entry does not exist, creates a new entry for given date
          Day.set("date", providedDate);
          Day.set("user", Parse.User.current());
          Day.set("mood", mood);
          Day.set("book", book);
          Day.set("movie", movie);
          Day.set("playlist", playlist);

          await Day.save();
        }
      }

      // Sets info for later getting details to display
      setCurrDayInfo({
        book: book,
        movie: movie,
        playlist: playlist,
      });

      // Sets first currently shown info
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

  // Changes the currently shown information (loops through currShown)
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
        </Container>
      )}
    </React.Fragment>
  );
};

export default MoodPage;
