import "./MoodPage.css";
import img5 from "../img/david-van-dijk-3LTht2nxd34-unsplash.jpg";
import Parse from "parse";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router";

const MoodPage = (props) => {
  const body = document.querySelector("body");
  body.style.backgroundImage = `url(${img5})`;
  body.style.backgroundPosition = "right";
  body.style.backgroundAttachment = "fixed";

  const [isLoading, setIsLoading] = useState(true);
  const [moodInfo, setMoodInfo] = useState({})
  const { mood } = useParams()

  useEffect(() => {
    setMood(mood)
  }, [])

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
        playlist: playlist
      })

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

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className='mood-page-container'>
          <h1 className='mood-page__title'>{`You are feeling ${mood}`}</h1>
          <div className='mood-page__content'>
            <button className="arrow-back arrow fas fa-chevron-left"></button>
            <img className='mood-page__content--img' src={moodInfo.book.get('avatar')} />
            <div className='mood-page__content--text'>
              <h3>{`${moodInfo.book.get('title')} by ${moodInfo.book.get('author')}`}</h3>
              <p>{moodInfo.book.get('description')}</p>
            </div>
            <button className="arrow-forward arrow fas fa-chevron-right"></button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default MoodPage;
