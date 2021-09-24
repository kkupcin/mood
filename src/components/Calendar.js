import "./Calendar.css";
import { calendarData } from "./calendarData";
import { useEffect, useState } from 'react'
import Parse from "parse";

const Calendar = () => {
  const [dayInfo, setDayInfo] = useState([
    {
      day: '',
      month: '',
      year: '',
      mood: '',
      book: {},
      movie: {},
      playlist: {}
    }
  ])

  useEffect(() => {
    getDate()
  }, [])

  const getDate = async () => {
    const query = new Parse.Query("Day");
    query.equalTo("user", Parse.User.current);
  
    try {
      let fetchedDays = await query.find();
      fetchedDays.forEach((day) => {
        let currIndex = day.get("date").getDate() -1;
  
        calendarData[0].days[currIndex].mood = day.get("mood");
        calendarData[0].days[currIndex].playlist = day.get("playlist").id;
        calendarData[0].days[currIndex].movie = day.get("movie").id;
        calendarData[0].days[currIndex].book = day.get("book").id;
        calendarData[0].days[currIndex].date = day.get("date");
      });
      console.log(calendarData);
    } catch (err) {
      console.log(err);
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
              {calendarData[0].days.map(day => {
                  return <li className={`calendar__div--day`}></li>
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
