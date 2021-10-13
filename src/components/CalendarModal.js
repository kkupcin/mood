import "./CalendarModal.css";
import Parse from "parse";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const CalendarModal = (props) => {
  const [dayInfo, setDayInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const retrieveData = async () => {
      setIsLoading(true);
      try {
        const Book = new Parse.Query("Book");
        Book.equalTo("objectId", props.data[0].book);
        Book.equalTo('mood', props.mood)
        const fetchedBook = await Book.find();

        const Playlist = new Parse.Query("Playlist");
        Playlist.equalTo("objectId", props.data[0].playlist);
        Playlist.equalTo('mood', props.mood)
        const fetchedPlaylist = await Playlist.find();

        const Movie = new Parse.Query("Movie");
        Movie.equalTo("objectId", props.data[0].movie);
        Movie.equalTo('mood', props.mood)
        const fetchedMovie = await Movie.find();

        const bookTitle = fetchedBook[0].get("title");
        const bookAuthor = fetchedBook[0].get("author");
        const bookAvatar = fetchedBook[0].get("avatar");

        const playlistTitle = fetchedPlaylist[0].get("title");
        const playlistAvatar = fetchedPlaylist[0].get("avatar");

        const movieTitle = fetchedMovie[0].get("title");
        const movieAvatar = fetchedMovie[0].get("avatar");

        setDayInfo({
          book: {
            title: bookTitle,
            author: bookAuthor,
            avatar: bookAvatar,
          },
          playlist: {
            title: playlistTitle,
            avatar: playlistAvatar,
          },
          movie: {
            title: movieTitle,
            avatar: movieAvatar,
          },
        });
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        alert(err);
      }
    };
    retrieveData();
  }, []);

  const closeModalHandler = () => {
    props.closeModal(true)
  }

  return (
    <React.Fragment>
      <div className="modal-outer"></div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className="modal-inner">
          <div className='modal--exit' onClick={closeModalHandler}>X</div>
          <h1 className="modal--title">{`${props.month} ${props.day}`}</h1>
          <div className="modal-box">
            <div className="modal--content-box">
              <h3 className="modal--content-title">Book</h3>
              <div>
                <img
                  className="modal--img"
                  src={dayInfo.book.avatar}
                  alt="Book cover"
                />
                <p>{`${dayInfo.book.title} by ${dayInfo.book.author}`}</p>
              </div>
            </div>
            <div className="modal--content-box">
              <h3 className="modal--content-title">Playlist</h3>
              <div>
                <img
                  className="modal--img"
                  src={dayInfo.playlist.avatar}
                  alt="Playlist cover"
                />
                <p>{`${dayInfo.playlist.title}`}</p>
              </div>
            </div>
            <div className="modal--content-box">
              <h3 className="modal--content-title">Movie</h3>
              <div>
                <img
                  className="modal--img"
                  src={dayInfo.movie.avatar}
                  alt="Movie poster"
                />
                <p>{`${dayInfo.movie.title}`}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default CalendarModal;
