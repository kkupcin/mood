import Parse from "parse";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { OuterModal } from "./styles/OuterModal.styled";
import { InnerModal, ModalBox, ModalExit } from "./styles/InnerModal.styled";
import { MoodChanger, StyledMoodLink } from "./styles/MoodChanger.styled";

const CalendarModal = (props) => {
  const [dayInfo, setDayInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data to display in modal from Parse
  const retrieveData = async () => {
    setIsLoading(true);
    try {
      const fetchedBook = await Parse.Cloud.run("fetchBookByUserAndMood", {
        book: props.data.book,
        mood: props.mood,
      });

      const fetchedMovie = await Parse.Cloud.run("fetchMovieByUserAndMood", {
        movie: props.data.movie,
        mood: props.mood,
      });

      const fetchedPlaylist = await Parse.Cloud.run(
        "fetchPlaylistByUserAndMood",
        {
          playlist: props.data.playlist,
          mood: props.mood,
        }
      );

      const bookTitle = fetchedBook.get("title");
      const bookAuthor = fetchedBook.get("author");
      const bookAvatar = fetchedBook.get("avatar");

      const playlistTitle = fetchedPlaylist.get("title");
      const playlistAvatar = fetchedPlaylist.get("avatar");

      const movieTitle = fetchedMovie.get("title");
      const movieAvatar = fetchedMovie.get("avatar");

      // Set data to display in modal
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

  // Check if a mood has been passed on
  useEffect(() => {
    if (props.data.mood !== "") {
      retrieveData();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Close modal if 'ESC' button is pressed
  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      closeModalHandler();
    }
  });

  // Close modal if 'X' is clicked
  const closeModalHandler = () => {
    props.closeModal(true);
  };

  return (
    <React.Fragment>
      <OuterModal />
      {isLoading && <LoadingSpinner className="mood-calendar" />}
      {!isLoading && (
        <InnerModal>
          <ModalExit onClick={closeModalHandler}>x</ModalExit>
          {props.data.mood && (
            <h1>{`${props.month} ${props.day} - ${props.mood}`}</h1>
          )}
          {props.data.mood && (
            <ModalBox>
              <div>
                <h3>Book</h3>
                <img src={dayInfo.book.avatar} alt="Book cover" />
                <p>{`${dayInfo.book.title} by ${dayInfo.book.author}`}</p>
              </div>
              <div>
                <h3>Playlist</h3>
                <img src={dayInfo.playlist.avatar} alt="Playlist cover" />
                <p>{`${dayInfo.playlist.title}`}</p>
              </div>
              <div>
                <h3>Movie</h3>
                <img src={dayInfo.movie.avatar} alt="Movie poster" />
                <p>{`${dayInfo.movie.title}`}</p>
              </div>
            </ModalBox>
          )}
          <MoodChanger>
            <h3>
              {props.data.mood
                ? "Felt different?"
                : "How did you feel on this day?"}
            </h3>
            <ul>
              <StyledMoodLink
                mood="sad"
                to={`/mood/sad/${props.year}-${props.monthIndex}-${props.day}`}
              >
                sad
              </StyledMoodLink>
              <StyledMoodLink
                mood="adventurous"
                to={`/mood/adventurous/${props.year}-${props.monthIndex}-${props.day}`}
              >
                adventurous
              </StyledMoodLink>
              <StyledMoodLink
                mood="excited"
                to={`/mood/excited/${props.year}-${props.monthIndex}-${props.day}`}
              >
                excited
              </StyledMoodLink>
              <StyledMoodLink
                mood="afraid"
                to={`/mood/afraid/${props.year}-${props.monthIndex}-${props.day}`}
              >
                afraid
              </StyledMoodLink>
              <StyledMoodLink
                mood="nostalgic"
                to={`/mood/nostalgic/${props.year}-${props.monthIndex}-${props.day}`}
              >
                nostalgic
              </StyledMoodLink>
              <StyledMoodLink
                mood="happy"
                to={`/mood/happy/${props.year}-${props.monthIndex}-${props.day}`}
              >
                happy
              </StyledMoodLink>
              <StyledMoodLink
                mood="lonely"
                to={`/mood/lonely/${props.year}-${props.monthIndex}-${props.day}`}
              >
                lonely
              </StyledMoodLink>
            </ul>
          </MoodChanger>
        </InnerModal>
      )}
    </React.Fragment>
  );
};

export default CalendarModal;
