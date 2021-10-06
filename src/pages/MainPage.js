import "./MainPage.css";
import img1 from "../img/leone-venter-VieM9BdZKFo-unsplash.jpg";
import Parse from "parse";

const MainPage = () => {
  const body = document.querySelector("body");
  body.style.backgroundImage = `url(${img1})`;
  body.style.backgroundPosition = "right";
  body.style.backgroundAttachment = "fixed";

  const setBook = async (mood) => {
    const query = new Parse.Query("Book");
    query.equalTo("mood", mood);
    const results = await query.find();

    const randomIndex = Math.floor(Math.random() * (results.length - 1));
    console.log(results)
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
      const date = new Date();
      const Day = new Parse.Object("Day");
      const book = await setBook(mood);
      const movie = await setMovie(mood);
      const playlist = await setPlaylist(mood);

      Day.set("date", date);
      Day.set("user", Parse.User.current());
      Day.set("mood", mood);
      Day.set("book", book);
      Day.set("movie", movie);
      Day.set("playlist", playlist);

      await Day.save();
      alert("Working");
    } catch (err) {
      alert(err);
    }
  };

  const moodClickListener = (e) => {
    switch (e.target.innerHTML) {
      case "sad":
        setMood("sad");
        break;
      case "adventurous":
        setMood("adventurous");
        break;
      case "excited":
        setMood("excited");
        break;
      case "afraid":
        setMood("afraid");
        break;
      case "nostalgic":
        setMood("nostalgic");
        break;
      case "happy":
        setMood("happy");
        break;
      case "lonely":
        setMood("lonely");
        break;
      default:
        return "";
    }
  };

  return (
    <div className="main">
      <h1 className="main__title">How are you feeling today?</h1>
      <ul className="main__list">
        <li className="main__list--item sad" onClick={moodClickListener}>
          sad
        </li>
        <li
          className="main__list--item adventurous"
          onClick={moodClickListener}
        >
          adventurous
        </li>
        <li className="main__list--item excited" onClick={moodClickListener}>
          excited
        </li>
        <li className="main__list--item afraid" onClick={moodClickListener}>
          afraid
        </li>
        <li className="main__list--item nostalgic" onClick={moodClickListener}>
          nostalgic
        </li>
        <li className="main__list--item happy" onClick={moodClickListener}>
          happy
        </li>
        <li className="main__list--item lonely" onClick={moodClickListener}>
          lonely
        </li>
      </ul>
      <p className="main__text">
        Mood is an app to track your mood changes and help you decide on your
        entertainment options - whether you'd like to read a book, watch a movie
        or listen to some music.
      </p>
    </div>
  );
};

export default MainPage;
