import "./Calendar.css";
import { calendarData } from "./calendarData";
import { useEffect, useState, useCallback } from "react";
import Parse from "parse";

const Calendar = () => {
  const [daysInfo, setDaysInfo] = useState(calendarData);

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
      console.log(daysInfo);
    } catch (err) {
      console.log(err);
    }
  }, [daysInfo]);

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

  return (
    <div className="calendar">
      <div className="calendar__div">
        <h1 className="calendar__title">Your Mood Calendar</h1>
        <h3 className="calendar__div--month">{calendarData[0].month}</h3>
        <div className="calendar__box">
          <button className="arrow-back arrow fas fa-chevron-left"></button>
          <ul className="calendar__div--list">
            {daysInfo[0].days.map((day, index) => {
              return (
                <li className={`calendar__div--day ${applyDayColor(index)}`}>
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
