import "./Calendar.css";
import { calendarData } from "./calendarData";
import CalendarModal from "./CalendarModal";
import { useEffect, useState, useCallback } from "react";
import Parse from "parse";

let clickedNumber = "";

const Calendar = () => {
  const [daysInfo, setDaysInfo] = useState(calendarData);
  const [showModal, setShowModal] = useState(false);
  const [clickedDayInfo, setClickedDayInfo] = useState([]);

  const getDate = useCallback(async () => {
    const query = new Parse.Query("Day");
    query.equalTo("user", Parse.User.current());

    try {
      let fetchedDays = await query.find();
      fetchedDays.forEach((day) => {
        let currIndex = day.get("date").getDate() - 1;

        setDaysInfo((prevState) => {
          let daysInfoCopy = [...calendarData];
          daysInfoCopy[0].days[currIndex].mood = day.get("mood");
          daysInfoCopy[0].days[currIndex].playlist = day.get("playlist").id;
          daysInfoCopy[0].days[currIndex].movie = day.get("movie").id;
          daysInfoCopy[0].days[currIndex].book = day.get("book").id;
          daysInfoCopy[0].days[currIndex].date = day.get("date");
          return daysInfoCopy;
        });
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getDate();
  }, [getDate]);

  const applyDayColor = (index) => {
    switch (daysInfo[0].days[index].mood) {
      case "sad":
        return "mood-sad";
      case "adventurous":
        return "mood-adventurous";
      case "lonely":
        return "mood-lonely";
      case "excited":
        return "mood-excited";
      case "happy":
        return "mood-happy";
      case "nostalgic":
        return "mood-nostalgic";
      case "afraid":
        return "mood-afraid";
      default:
        return "";
    }
  };

  const openDayInfoHandler = (e) => {
    const clickedDay = daysInfo[0].days.filter(
      (day, index) => index + 1 === parseInt(e.target.innerText)
    );

    clickedNumber = e.target.innerText;

    setClickedDayInfo(clickedDay);

    setShowModal(true);
    // Add modal with the day's info
  };

  const closeModalHandler = () => {
    setShowModal(false)
  }

  return (
    <div className="calendar">
      {showModal && (
        <CalendarModal
          closeModal={closeModalHandler}
          data={clickedDayInfo}
          month={daysInfo[0].month}
          day={clickedNumber}
          mood={clickedDayInfo[0].mood}
        />
      )}
      <div className="calendar__div">
        <h1 className="calendar__title">Your Mood Calendar</h1>
        <h3 className="calendar__div--month">{calendarData[0].month}</h3>
        <div className="calendar__box">
          <button className="arrow-back arrow fas fa-chevron-left"></button>
          <ul className="calendar__div--list">
            {daysInfo[0].days.map((day, index) => {
              return (
                <li
                  onClick={openDayInfoHandler}
                  className={`calendar__div--day ${applyDayColor(index)}`}
                >
                  <span className="calendar__div--day--span">
                    {!day.date ? index + 1 : day.date.getDate()}
                  </span>
                </li>
              );
            })}
          </ul>
          <button className="arrow-forward arrow fas fa-chevron-right"></button>
        </div>
      </div>
      <ul className="color-guide">
        <li className="color-guide__item">
          <div className="calendar__div--day mood-sad"></div>
          Sad
        </li>
        <li className="color-guide__item">
          <div className="calendar__div--day mood-lonely"></div>
          Lonely
        </li>
        <li className="color-guide__item">
          <div className="calendar__div--day mood-happy"></div>
          Happy
        </li>
        <li className="color-guide__item">
          <div className="calendar__div--day mood-adventurous"></div>
          Adventurous
        </li>
        <li className="color-guide__item">
          <div className="calendar__div--day mood-nostalgic"></div>
          Nostalgic
        </li>
        <li className="color-guide__item">
          <div className="calendar__div--day mood-afraid"></div>
          Afraid
        </li>
        <li className="color-guide__item">
          <div className="calendar__div--day mood-excited"></div>
          Excited
        </li>
      </ul>
    </div>
  );
};

export default Calendar;
