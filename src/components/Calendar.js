import "./Calendar.css";
import { dummyData } from "./dummyData";

const Calendar = () => {
console.log(dummyData)

  return (
    <div className="calendar">
      <div className="calendar__div">
        <h1 className="calendar__title">Your Mood Calendar</h1>
        <h3 className="calendar__div--month">{dummyData[0].month}</h3>
        <div className="calendar__box">
          <button className="arrow-back arrow fas fa-chevron-left"></button>
          <ul className="calendar__div--list">
              {dummyData[0].days.map(day => {
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
