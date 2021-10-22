import "./Calendar.css";
import { setCalendarData } from "./calendarData";
import CalendarModal from "./CalendarModal";
import React, { useEffect, useState } from "react";
import Parse from "parse";
import {
  CalendarItem,
  CalendarList,
  ColorGuide,
  StyledCalendar,
} from "./styles/StyledCalendar.styled";

let clickedNumber = "";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInfo, setDaysInfo] = useState(setCalendarData(currentDate));
  const [fetchedDays, setFetchedDays] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [clickedDayInfo, setClickedDayInfo] = useState([]);
  const [monthIsEmpty, setMonthIsEmpty] = useState(false);

  const fetchData = async () => {
    const query = new Parse.Query("Day");
    query.equalTo("user", Parse.User.current());

    try {
      let newFetchedDays = await query.find();
      setFetchedDays(newFetchedDays);
    } catch (err) {
      alert(err);
    }
  };

  const getDate = () => {
    let placeholderData = setCalendarData(currentDate);
    // if (fetchedDays.length === 0) {
    //   setMonthIsEmpty(true);
    // }

    let placeholderDataCopy = [...placeholderData];
    fetchedDays.forEach((day) => {
      let currIndex = day.get("date").getDate() - 1;

      if (
        getLocaleStringMonth(day.get("date")) ===
          getLocaleStringMonth(currentDate) &&
        day.get("date").getFullYear() === currentDate.getFullYear()
      ) {
        placeholderDataCopy[0].days[currIndex].mood = day.get("mood");
        placeholderDataCopy[0].days[currIndex].playlist =
          day.get("playlist").id;
        placeholderDataCopy[0].days[currIndex].movie = day.get("movie").id;
        placeholderDataCopy[0].days[currIndex].book = day.get("book").id;
        placeholderDataCopy[0].days[currIndex].date = day.get("date");
      }
    });

    setDaysInfo(placeholderDataCopy);
  };

  const getLocaleStringMonth = (date) => {
    return date.toLocaleString("en-US", { month: "long" });
  };

  useEffect(() => {
    getDate();
  }, [fetchedDays, currentDate]);

  useEffect(() => {
    fetchData();
  }, []);

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
      date.setMonth(date.getMonth() + 1);
    } else if (e.target.classList.contains("arrow-back")) {
      date.setMonth(date.getMonth() - 1);
    }
    setCurrentDate(date);
  };

  return (
    <React.Fragment>
      {showModal && (
        <CalendarModal
          closeModal={closeModalHandler}
          data={clickedDayInfo}
          month={currentDate.toLocaleString("en-US", {
            month: "long",
          })}
          day={clickedNumber}
          mood={clickedDayInfo[0].mood}
        />
      )}
      <StyledCalendar>
        <h1>Your Mood Calendar</h1>
        <h3>
          {currentDate.toLocaleString("en-US", {
            month: "long",
          })}
        </h3>
        <div>
          <button
            className={`arrow-back arrow fas fa-chevron-left `}
            onClick={changeMonthHandler}
          ></button>
          <CalendarList>
            {daysInfo[0].days.map((day, index) => {
              return (
                <CalendarItem
                  onClick={openDayInfoHandler}
                  mood={daysInfo[0].days[index].mood}
                  className={daysInfo[0].days[index].mood.length === 0 ? "disabled" : ""}
                >
                  <span>{!day.date ? index + 1 : day.date.getDate()}</span>
                </CalendarItem>
              );
            })}
          </CalendarList>
          <button
            className={`arrow-forward arrow fas fa-chevron-right 
            `}
            onClick={changeMonthHandler}
          ></button>
        </div>
      </StyledCalendar>

      <ColorGuide>
        <li>
          <CalendarItem mood="sad"></CalendarItem>
          Sad
        </li>
        <li>
          <CalendarItem mood="lonely"></CalendarItem>
          Lonely
        </li>
        <li>
          <CalendarItem mood="happy"></CalendarItem>
          Happy
        </li>
        <li>
          <CalendarItem mood="adventurous"></CalendarItem>
          Adventurous
        </li>
        <li>
          <CalendarItem mood="nostalgic"></CalendarItem>
          Nostalgic
        </li>
        <li>
          <CalendarItem mood="afraid"></CalendarItem>
          Afraid
        </li>
        <li>
          <CalendarItem mood="excited"></CalendarItem>
          Excited
        </li>
      </ColorGuide>
    </React.Fragment>
  );
};

export default Calendar;
