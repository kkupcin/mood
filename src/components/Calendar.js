import "./Calendar.css";
import { setCalendarData } from "./calendarData";
import CalendarModal from "./CalendarModal";
import { useEffect, useState, useCallback } from "react";
import Parse from "parse";

let clickedNumber = "";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInfo, setDaysInfo] = useState(setCalendarData(currentDate));
  const [showModal, setShowModal] = useState(false);
  const [clickedDayInfo, setClickedDayInfo] = useState([]);
  const [monthIsEmpty, setMonthIsEmpty] = useState(false);

  const getDate = async () => {
    const query = new Parse.Query("Day");
    query.equalTo("user", Parse.User.current());
    // pick month to currently show
    query.greaterThanOrEqualTo(
      "date",
      new Date(
        `01/${currentDate.toLocaleString("en-US", {
          month: "long",
        })}/${currentDate.getFullYear()}`
      )
    );
    query.lessThanOrEqualTo(
      "date",
      new Date(
        `${daysInfo[0].days.length}/${currentDate.toLocaleString("en-US", {
          month: "long",
        })}/${currentDate.getFullYear()}`
      )
    );

    let placeholderData = setCalendarData(currentDate);

    try {
      let fetchedDays = await query.find();

      if (fetchedDays.length === 0) {
        setMonthIsEmpty(true);
      }

      let placeholderDataCopy = [...placeholderData];
      fetchedDays.forEach((day) => {
        let currIndex = day.get("date").getDate() - 1;

        placeholderDataCopy[0].days[currIndex].mood = day.get("mood");
        placeholderDataCopy[0].days[currIndex].playlist =
          day.get("playlist").id;
        placeholderDataCopy[0].days[currIndex].movie = day.get("movie").id;
        placeholderDataCopy[0].days[currIndex].book = day.get("book").id;
        placeholderDataCopy[0].days[currIndex].date = day.get("date");
      });

      setDaysInfo(placeholderDataCopy);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDate();
  }, [currentDate]);

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
        return "disabled";
    }
  };

  const openDayInfoHandler = (e) => {
    const clickedDay = daysInfo[0].days.filter(
      (day, index) => index + 1 === parseInt(e.target.innerText)
    );

    clickedNumber = e.target.innerText;

    setClickedDayInfo(clickedDay);

    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const changeMonthHandler = (e) => {
    let date = new Date(currentDate);
    if (e.target.classList.contains("arrow-forward")) {
      // setCalendarData(1)
      date.setMonth(date.getMonth() + 1);
    } else if (e.target.classList.contains("arrow-back")) {
      // setCalendarData(-1);
      date.setMonth(date.getMonth() - 1);
    }
    setCurrentDate(date);
  };

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
        <h3 className="calendar__div--month">
          {currentDate.toLocaleString("en-US", {
            month: "long",
          })}
        </h3>
        <div className="calendar__box">
          <button
            className={`arrow-back arrow fas fa-chevron-left ${
              monthIsEmpty && "disabled"
            }`}
            onClick={changeMonthHandler}
          ></button>
          <ul className="calendar__div--list">
            {console.log(daysInfo)}
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
          <button
            className={`arrow-forward arrow fas fa-chevron-right ${
              monthIsEmpty && "disabled"
            }`}
            onClick={changeMonthHandler}
          ></button>
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
