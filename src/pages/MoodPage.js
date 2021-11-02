import "./MoodPage.css";
import img5 from "../img/david-van-dijk-3LTht2nxd34-unsplash.jpg";
import Parse from "parse";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router";
import { Container } from "../components/styles/Container.styled";
import NotLoggedInPage from "./NotLoggedInPage";

const MoodPage = (props) => {
  const body = document.querySelector("body");
  body.style.backgroundImage = `url(${img5})`;
  body.style.backgroundPosition = "right";
  body.style.backgroundAttachment = "fixed";

  const [isLoading, setIsLoading] = useState(true);
  const [moodInfo, setMoodInfo] = useState({});
  const [currInfo, setCurrInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { mood } = useParams();

  useEffect(() => {
    if (props.isLoggedIn) {
      setIsLoggedIn(true);
      setMood(mood);
    } else {
      setIsLoggedIn(false);
      setIsLoading(false)
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

  const setMood = async (mood) => {
    try {
      setIsLoading(true);
      const date = new Date();
      const Day = new Parse.Object("Day");
      const book = await setBook(mood);
      const movie = await setMovie(mood);
      const playlist = await setPlaylist(mood);

      setMoodInfo({
        book: book,
        movie: movie,
        playlist: playlist,
      });

      console.log(book);

      setCurrInfo({
        current: "book",
        title: book.get("title"),
        description: book.get("description"),
        avatar: book.get("avatar"),
        author: book.get("author"),
      });

      Day.set("date", date);
      Day.set("user", Parse.User.current());
      Day.set("mood", mood);
      Day.set("book", book);
      Day.set("movie", movie);
      Day.set("playlist", playlist);

      await Day.save();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert(err);
    }
  };

  const changeCurrShownHandler = (e) => {
    if (e.target.classList.contains("arrow-forward")) {
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
    } else if (e.target.classList.contains("arrow-back")) {
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
      {!isLoading &&
        !isLoggedIn && (
          <NotLoggedInPage />
        )}
      {!isLoading &&
        isLoggedIn && (
          <Container>
            <h1>{`You are feeling ${mood}`}</h1>
            <div className="mood-page__content">
              <button
                className="arrow-back arrow fas fa-chevron-left"
                onClick={changeCurrShownHandler}
              ></button>
              <img
                className="mood-page__content--img"
                src={currInfo.avatar}
                alt={currInfo.title}
              />
              <div className="mood-page__content--text">
                <h3>
                  {currInfo.author
                    ? `${currInfo.title} by ${currInfo.author}`
                    : currInfo.title}
                </h3>
                <p>{currInfo.description}</p>
              </div>
              <button
                className="arrow-forward arrow fas fa-chevron-right"
                onClick={changeCurrShownHandler}
              ></button>
            </div>
          </Container>
        )}
    </React.Fragment>
  );
};

export default MoodPage;
